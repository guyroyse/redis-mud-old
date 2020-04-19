const RedisGraphShim = require('../data/redis-graph-shim')
const Queries = require('../data/queries')

const Room = require('./room')

const NULL_UUID = '00000000-0000-0000-0000-000000000000'

class Dungeon {

  open() {
    this.shim = new RedisGraphShim()
    this.shim.open('dungeon')
  }

  close() {
    this.shim.close()
  }

  async fetchRoomList() {
    let valueSet = await this.shim.executeAndReturnMany(Queries.FETCH_ALL_ROOMS)
    return valueSet.map(values => this.roomFromValues(values))
  }

  async fetchOrCreateHub() {
    let values = await this.shim.executeAndReturnSingle(Queries.FETCH_OR_CREATE_HUB,
      { name: 'The Hub', description: 'Huge hub is huge' })
    return this.roomFromValues(values)
  }

  async createRoom(name) {
    let values = await this.shim.executeAndReturnSingle(Queries.CREATE_ROOM,
      { name, description: 'This is a room.' })
    return this.roomFromValues(values)
  }

  async updateRoom(id, name, description) {
    await this.shim.execute(Queries.UPDATE_ROOM, { id, name, description })
  }

  roomFromValues(values) {
    return new Room(this, {
      id: values[0],
      name: values[1],
      description: values[2]
    })
  }
}

module.exports = Dungeon
