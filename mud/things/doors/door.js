const RedisGraphShim = require('../../data/redis-graph-shim')
const Queries = require('./door-queries')
const Rooms = require('../rooms/rooms')

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

  static async create(name) {
    let graph = new RedisGraphShim()

    let description = "This is a door."
    let values = await graph.executeAndReturnSingle(Queries.CREATE, { name, description })
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
    await graph.execute(Queries.PLACE_IN, { id: this.id, roomId })
  }

  async addDestination(roomId) {
    let graph = new RedisGraphShim()
    await graph.execute(Queries.ADD_DESTINATION, { id: this.id, roomId })
  }

  async update() {
    let graph = new RedisGraphShim()
    await graph.execute(Queries.UPDATE, { id: this.id, name: this.name, description: this.description })
  }
}

module.exports = Door
