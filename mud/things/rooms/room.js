const RedisGraphShim = require('../../data/redis-graph-shim')
const Queries = require('./room-queries')
const Doors = require('../doors/doors')

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
    let values = await graph.executeAndReturnSingle(Queries.FETCH_OR_CREATE_HUB, { name, description })
    return this.fromValues(values)
  }

  static async byId(id) {
    let graph = new RedisGraphShim()
    let values = await graph.executeAndReturnSingle(Queries.FETCH_BY_ID, {id})
    return this.fromValues(values)
  }

  static async create(name) {
    let graph = new RedisGraphShim()
    let description = "This is a room."
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

  async doors() {
    return await Doors.inRoom(this.id)
  }

  async update() {
    let graph = new RedisGraphShim()
    await graph.execute(Queries.UPDATE, { id: this.id, name: this.name, description: this.description })
  }

}

module.exports = Room
