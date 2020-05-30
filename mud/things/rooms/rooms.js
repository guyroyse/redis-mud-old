const RedisGraphShim = require('../../data/redis-graph-shim')
const Queries = require('./room-queries')
const Room = require('./room')

class Rooms {
  constructor(dungeon, shim) {
    this._shim = shim
    this._dungeon = dungeon
  }

  async fetchOrCreateHub() {
    let name = 'The Hub'
    let description = 'Huge hub is huge'
    let values = await this._shim.executeAndReturnSingle(Queries.FETCH_OR_CREATE_HUB, { name, description })
    return this.fromValues(values)
  }

  async all() {
    let valueSet = await this._shim.executeAndReturnMany(Queries.FETCH_ALL)
    return valueSet.map(values => this.fromValues(values))
  }

  async byId(id) {
    let values = await this._shim.executeAndReturnSingle(Queries.FETCH_BY_ID, {id})
    return this.fromValues(values)
  }

  async create(name) {
    let description = "This is a room."
    let values = await this._shim.executeAndReturnSingle(Queries.CREATE, { name, description })
    return this.fromValues(values)
  }

  async update(id, name, description) {
    await this._shim.execute(Queries.UPDATE_ROOM, { id, name, description })
  }

  fromValues(values) {
    return new Room(this._dungeon, {
      id: values[0],
      name: values[1],
      description: values[2]
    })
  }

}

module.exports = Rooms
