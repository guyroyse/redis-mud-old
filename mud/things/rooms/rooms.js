const RedisGraphShim = require('../../data/redis-graph-shim')
const Queries = require('./room-queries')
const Room = require('./room')

class Rooms {
  constructor(dungeon) {
    this.dungeon = dungeon
    this.shim = new RedisGraphShim()
  }

  async fetchOrCreateHub() {
    let name = 'The Hub'
    let description = 'Huge hub is huge'
    let values = await this.shim.executeAndReturnSingle(Queries.FETCH_OR_CREATE_HUB, { name, description })
    return this.fromValues(values)
  }

  async all() {
    let valueSet = await this.shim.executeAndReturnMany(Queries.FETCH_ALL)
    return valueSet.map(values => this.fromValues(values))
  }

  async byId(id) {
    let values = await this.shim.executeAndReturnSingle(Queries.FETCH_BY_ID, {id})
    return this.fromValues(values)
  }

  async create(name) {
    let description = "This is a room."
    let values = await this.shim.executeAndReturnSingle(Queries.CREATE, { name, description })
    return this.fromValues(values)
  }

  async update(id, name, description) {
    await this.shim.execute(Queries.UPDATE_ROOM, { id, name, description })
  }

  fromValues(values) {
    return new Room(this.dungeon, {
      id: values[0],
      name: values[1],
      description: values[2]
    })
  }

}

module.exports = Rooms
