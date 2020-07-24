const RedisGraphShim = require('../data/redis-graph-shim')
const DoorQueries = require('./door-queries')
const RoomQueries = require('./room-queries')
const UserQueries = require('./user-queries')

class Thing {
  static proxy(map) {

    let thing = new this()

    return new Proxy(thing, {

      get: (thing, propertyName) => {
        if (Reflect.has(thing, propertyName)) return thing[propertyName]
        return map.get(propertyName)
      },

      set: function(thing, propertyName, value) {
        if (propertyName !== 'id') {
          map.set(propertyName, value)
          thing.update()
          return true
        }
        return false
      }

    })
  }
}

class Door extends Thing {

  static async byId(id) {
    let graph = new RedisGraphShim()
    let map = await graph.executeAndReturnSingle(DoorQueries.FETCH_BY_ID, {id})
    return Door.proxy(map)
  }

  static async create(name) {
    let graph = new RedisGraphShim()
    let description = "This is a door."
    let map = await graph.executeAndReturnSingle(DoorQueries.CREATE, { name, description })
    return Door.proxy(map)
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

  async update() {
    let graph = new RedisGraphShim()
    await graph.execute(DoorQueries.UPDATE, { id: this.id, name: this.name, description: this.description })
  }
}

class Room extends Thing {
  static async hub() {
    let graph = new RedisGraphShim()
    let name = 'The Hub'
    let description = 'Huge hub is huge'
    let map = await graph.executeAndReturnSingle(RoomQueries.FETCH_OR_CREATE_HUB, { name, description })
    return Room.proxy(map)
  }

  static async byId(id) {
    let graph = new RedisGraphShim()
    let map = await graph.executeAndReturnSingle(RoomQueries.FETCH_BY_ID, {id})
    return Room.proxy(map)
  }

  static async create(name) {
    let graph = new RedisGraphShim()
    let description = "Room is a room."
    let map = await graph.executeAndReturnSingle(RoomQueries.CREATE, { name, description })
    return this.proxy(map)
  }

  async doors() {
    return await Doors.inRoom(this.id)
  }

  async update() {
    let graph = new RedisGraphShim()
    await graph.execute(RoomQueries.UPDATE, { id: this.id, name: this.name, description: this.description })
  }
}

class User extends Thing {

  static async byName(name) {
    let graph = new RedisGraphShim()
    let map = await graph.executeAndReturnSingle(UserQueries.FETCH_BY_NAME, {name})
    if (!map) return null;
    return User.proxy(map)
  }

  static async create(name, password) {
    let graph = new RedisGraphShim()
    let map = await graph.executeAndReturnSingle(UserQueries.CREATE, { name, password })
    return User.proxy(map)
  }

  async update() {
    let graph = new RedisGraphShim()
    await graph.execute(UserQueries.UPDATE, { id: this.id, password: this.password })
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
