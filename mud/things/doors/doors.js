const RedisGraphShim = require('../../data/redis-graph-shim')
const Queries = require('./door-queries')
const Door = require('./door')

class Doors {
  static async inRoom(roomId) {
    let graph = new RedisGraphShim()
    let valueSet = await graph.executeAndReturnMany(Queries.IN_ROOM, { roomId })
    return valueSet.map(values => Door.fromValues(values))
  }
}

module.exports = Doors
