const Room = require('./things/rooms/room')

class Context {
  async load() {
    this._room = await Room.hub()
  }

  get room() { return this._room }
  set room(room) { this._room = room }
}

module.exports = Context
