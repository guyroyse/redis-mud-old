const RedisGraphShim = require('../data/redis-graph-shim')
const RoomQueries = require('./room-queries')
const DoorQueries = require('./door-queries')
const UserQueries = require('./user-queries')

const Rooms = {
  all: async function() {
    let graph = new RedisGraphShim()
    let maps = await graph.executeAndReturnMany(RoomQueries.FETCH_ALL)
    return maps.map(map => Room.fromMap(map))
  },

  asDoorDestination: async function(doorId) {
    let graph = new RedisGraphShim()
    let maps = await graph.executeAndReturnMany(RoomQueries.FETCH_AS_DOOR_DESTINATION, { doorId })
    return maps.map(map => Room.fromMap(map))
  }
}

class Room {
  constructor({id, name, description}) {
    this._id = id
    this._name = name
    this._description = description
  }

  static fromMap(map) {
    let arg = {}
    map.forEach((value, key) => arg[key] = value)
    return new Room(arg)
  }

  static async hub() {
    let graph = new RedisGraphShim()
    let name = 'The Hub'
    let description = 'Huge hub is huge'
    let map = await graph.executeAndReturnSingle(RoomQueries.FETCH_OR_CREATE_HUB, { name, description })
    return this.fromMap(map)
  }

  static async byId(id) {
    let graph = new RedisGraphShim()
    let map = await graph.executeAndReturnSingle(RoomQueries.FETCH_BY_ID, {id})
    return this.fromMap(map)
  }

  static async create(name) {
    let graph = new RedisGraphShim()
    let description = "This is a room."
    let map = await graph.executeAndReturnSingle(RoomQueries.CREATE, { name, description })
    return this.fromMap(map)
  }

  get id() { return this._id }

  get name() { return this._name }
  set name(name) {
    this._name = name
    this.update()
  }

  get description() { return this._description }
  set description(description) {
    this._description = description
    this.update()
  }

  async doors() {
    return await Doors.inRoom(this.id)
  }

  async update() {
    let graph = new RedisGraphShim()
    await graph.execute(RoomQueries.UPDATE, { id: this.id, name: this.name, description: this.description })
  }
}

const Doors = {
  inRoom: async function(roomId) {
    let graph = new RedisGraphShim()
    let maps = await graph.executeAndReturnMany(DoorQueries.IN_ROOM, { roomId })
    return maps.map(map => Door.fromMap(map))
  }
}

class Door {
  constructor({id, name, description}) {
    this._id = id
    this._name = name
    this._description = description
  }

  static fromMap(map) {
    let arg = {}
    map.forEach((value, key) => arg[key] = value)
    return new Door(arg)
  }

  static async byId(id) {
    let graph = new RedisGraphShim()
    let map = await graph.executeAndReturnSingle(DoorQueries.FETCH_BY_ID, {id})
    return this.fromMap(map)
  }

  static async create(name) {
    let graph = new RedisGraphShim()

    let description = "This is a door."
    let map = await graph.executeAndReturnSingle(DoorQueries.CREATE, { name, description })
    return this.fromMap(map)
  }

  get id() { return this._id }

  get name() { return this._name }
  set name(name) {
    this._name = name
    this.update()
  }

  get description() { return this._description }
  set description(description) {
    this._description = description
    this.update()
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

class User {
  constructor({ id, name, password }) {
    this._id = id
    this._name = name
    this._password = password
  }

  static fromMap(map) {
    let arg = {}
    map.forEach((value, key) => arg[key] = value)
    return new User(arg)
  }

  static async byName(name) {
    let graph = new RedisGraphShim()
    let map = await graph.executeAndReturnSingle(UserQueries.FETCH_BY_NAME, {name})
    if (!map) return null;
    return this.fromMap(map)
  }

  static async create(name, password) {
    let graph = new RedisGraphShim()
    let map = await graph.executeAndReturnSingle(UserQueries.CREATE, { name, password })
    return this.fromMap(map)
  }

  get id() { return this._id }

  get name() { return this._name }

  get password() { return this._password }
  set password(password) {
    this._password = password
    this.update()
  }

  async update() {
    let graph = new RedisGraphShim()
    await graph.execute(UserQueries.UPDATE, { id: this.id, password: this.password })
  }

}

module.exports = { Door, Doors, Room, Rooms, User }
