const RedisGraphShim = require('../data/redis-graph-shim')
const RoomQueries = require('./room-queries')
const DoorQueries = require('./door-queries')

class Rooms {
  static async all() {
    let graph = new RedisGraphShim()
    let valueSet = await graph.executeAndReturnMany(RoomQueries.FETCH_ALL)
    return valueSet.map(values => Room.fromValues(values))
  }

  static async asDoorDestination(doorId) {
    let graph = new RedisGraphShim()
    let valueSet = await graph.executeAndReturnMany(RoomQueries.FETCH_AS_DOOR_DESTINATION, { doorId })
    return valueSet.map(values => Room.fromValues(values))
  }
}

class Room {
  constructor({id, name, description}) {
    this._id = id
    this._name = name
    this._description = description
  }

  static fromValues(values) {
    return new Room({
      id: values[0],
      name: values[1],
      description: values[2]
    })
  }

  static async hub() {
    let graph = new RedisGraphShim()
    let name = 'The Hub'
    let description = 'Huge hub is huge'
    let values = await graph.executeAndReturnSingle(RoomQueries.FETCH_OR_CREATE_HUB, { name, description })
    return this.fromValues(values)
  }

  static async byId(id) {
    let graph = new RedisGraphShim()
    let values = await graph.executeAndReturnSingle(RoomQueries.FETCH_BY_ID, {id})
    return this.fromValues(values)
  }

  static async create(name) {
    let graph = new RedisGraphShim()
    let description = "This is a room."
    let values = await graph.executeAndReturnSingle(RoomQueries.CREATE, { name, description })
    return this.fromValues(values)
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

class Doors {
  static async inRoom(roomId) {
    let graph = new RedisGraphShim()
    let valueSet = await graph.executeAndReturnMany(DoorQueries.IN_ROOM, { roomId })
    return valueSet.map(values => Door.fromValues(values))
  }
}

class Door {
  constructor({id, name, description}) {
    this._id = id
    this._name = name
    this._description = description
  }

  static fromValues(values) {
    return new Door({
      id: values[0],
      name: values[1],
      description: values[2]
    })
  }

  static async byId(id) {
    let graph = new RedisGraphShim()
    let values = await graph.executeAndReturnSingle(DoorQueries.FETCH_BY_ID, {id})
    return this.fromValues(values)
  }

  static async create(name) {
    let graph = new RedisGraphShim()

    let description = "This is a door."
    let values = await graph.executeAndReturnSingle(DoorQueries.CREATE, { name, description })
    return this.fromValues(values)
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

  async addDestination(roomId) {
    let graph = new RedisGraphShim()
    await graph.execute(DoorQueries.ADD_DESTINATION, { id: this.id, roomId })
  }

  async update() {
    let graph = new RedisGraphShim()
    await graph.execute(DoorQueries.UPDATE, { id: this.id, name: this.name, description: this.description })
  }
}

module.exports = { Door, Doors, Room, Rooms }
