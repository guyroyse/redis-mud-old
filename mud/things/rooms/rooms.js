const RedisGraphShim = require('../../data/redis-graph-shim')
const Queries = require('./room-queries')
const Room = require('./room')

class Rooms {
  static async all() {
    let graph = new RedisGraphShim()
    let valueSet = await graph.executeAndReturnMany(Queries.FETCH_ALL)
    return valueSet.map(values => Room.fromValues(values))
  }

  static async asDoorDestination(doorId) {
    let graph = new RedisGraphShim()
    let valueSet = await graph.executeAndReturnMany(Queries.FETCH_AS_DOOR_DESTINATION, { doorId })
    return valueSet.map(values => Room.fromValues(values))
  }
}

module.exports = Rooms
