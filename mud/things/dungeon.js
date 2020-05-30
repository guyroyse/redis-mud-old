const Rooms = require('./rooms/rooms')
const Doors = require('./doors/doors')

class Dungeon {
  constructor() {
    this._doors = new Doors(this)
    this._rooms = new Rooms(this)
  }

  get doors() { return this._doors }
  get rooms() { return this._rooms }
}

module.exports = Dungeon
