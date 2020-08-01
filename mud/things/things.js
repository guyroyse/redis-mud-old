const RedisGraphShim = require('../data/redis-graph-shim')
const DoorQueries = require('./door-queries')
const RoomQueries = require('./room-queries')
const UserQueries = require('./user-queries')

class Thing {
  static proxy(map) {
    let thing = new this()
    thing.map = map

    return new Proxy(thing, {

      get: (thing, propertyName, proxy) => {
        if (Reflect.has(thing, propertyName)) return thing[propertyName]
        return thing.map.get(propertyName)
      },

      set: function(thing, propertyName, value, proxy) {
        if (propertyName !== 'id') {
          thing.map.set(propertyName, value)
          thing.update(proxy)
          return true
        }
        return false
      }
    })
  }

  static async executeAndReturnSingle(query, parameters) {
    return await new RedisGraphShim().executeAndReturnSingle(query, parameters)
  }
}

class Door extends Thing {

  static async byId(id) {
    return Door.proxy(await this.executeAndReturnSingle(DoorQueries.FETCH_BY_ID, {id}))
  }

  static async create(name) {
    return Door.proxy(await this.executeAndReturnSingle(DoorQueries.CREATE, { name, description: "This is a door." }))
  }

  async destinations() {
    return await Rooms.asDoorDestination(this.id)
  }

  async placeIn(roomId) {
    let graph = new RedisGraphShim()
    await graph.execute(DoorQueries.PLACE_IN, { id: this.id, roomId })
  }

  async dislocate() {
    let graph = new RedisGraphShim()
    await graph.execute(DoorQueries.DISLOCATE, { id: this.id })
  }

  async addDestination(roomId) {
    let graph = new RedisGraphShim()
    await graph.execute(DoorQueries.ADD_DESTINATION, { id: this.id, roomId })
  }

  async clearDestinations() {
    let graph = new RedisGraphShim()
    await graph.execute(DoorQueries.CLEAR_DESTINATIONS, { id: this.id })
  }

  async update(proxy) {
    let graph = new RedisGraphShim()
    await graph.execute(DoorQueries.UPDATE, { id: proxy.id, name: proxy.name, description: proxy.description })
  }
}

class Room extends Thing {
  static async hub() {
    return Room.proxy(await this.executeAndReturnSingle(RoomQueries.FETCH_OR_CREATE_HUB, { name: "The Hub", description: "Huge hub is huge" }))
  }

  static async byId(id) {
    return Room.proxy(await this.executeAndReturnSingle(RoomQueries.FETCH_BY_ID, {id}))
  }

  static async forUser(userId) {
    return Room.proxy(await this.executeAndReturnSingle(RoomQueries.FETCH_FOR_USER, {userId}))
  }

  static async create(name) {
    return Room.proxy(await this.executeAndReturnSingle(RoomQueries.CREATE, { name, description: "This is a room." }))
  }

  async doors() {
    return await Doors.inRoom(this.id)
  }

  async update(proxy) {
    let graph = new RedisGraphShim()
    await graph.execute(RoomQueries.UPDATE, { id: proxy.id, name: proxy.name, description: proxy.description })
  }
}

class User extends Thing {

  static async byName(name) {
    let map = await this.executeAndReturnSingle(UserQueries.FETCH_BY_NAME, {name})
    if (!map) return null
    return User.proxy(map)
  }

  static async create(name, password) {
    return User.proxy(await this.executeAndReturnSingle(UserQueries.CREATE, { name, password }))
  }

  async currentRoom() {
    return await Room.forUser(this.id)
  }

  async placeInHub() {}

  async update(proxy) {
    let graph = new RedisGraphShim()
    await graph.execute(UserQueries.UPDATE, { id: proxy.id, password: proxy.password })
  }
}

const Doors = {
  inRoom: async function(roomId) {
    let graph = new RedisGraphShim()
    let maps = await graph.executeAndReturnMany(DoorQueries.IN_ROOM, { roomId })
    return maps.map(map => Door.proxy(map))
  }
}

const Rooms = {
  all: async function() {
    let graph = new RedisGraphShim()
    let maps = await graph.executeAndReturnMany(RoomQueries.FETCH_ALL)
    return maps.map(map => Room.proxy(map))
  },

  asDoorDestination: async function(doorId) {
    let graph = new RedisGraphShim()
    let maps = await graph.executeAndReturnMany(RoomQueries.FETCH_AS_DOOR_DESTINATION, { doorId })
    return maps.map(map => Room.proxy(map))
  }
}

module.exports = { Door, Room, User, Doors, Rooms }
