const RedisGraphShim = require('../data/redis-graph-shim')
const Doors = require('./doors/doors')
const Rooms = require('./rooms/rooms')

class Dungeon {
  open() {
    let shim = new RedisGraphShim()
    this._doors = new Doors(this, shim)
    this._rooms = new Rooms(this, shim)
  }

  get doors() { return this._doors }
  get rooms() { return this._rooms }
}

module.exports = Dungeon
