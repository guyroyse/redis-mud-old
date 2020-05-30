const RedisGraphShim = require('../../data/redis-graph-shim')
const Queries = require('./door-queries')
const Door = require('./door')

class Doors {
  constructor(dungeon) {
    this.dungeon = dungeon
    this.shim = new RedisGraphShim()
  }

  async inRoom(roomId) {
    let valueSet = await this.shim.executeAndReturnMany(Queries.IN_ROOM, {roomId})
    return valueSet.map(values => this.fromValues(values))
  }

  async createDoor(name, containingRoom) {
    let description = "This is a door."
    let values = await this.shim.executeAndReturnSingle(Queries.CREATE, { name, description, containingRoom })
    return this.fromValues(values)
  }

  fromValues(values) {
    return new Door(this.dungeon, {
      id: values[0],
      name: values[1],
      description: values[2]
    })
  }
}

module.exports = Doors
