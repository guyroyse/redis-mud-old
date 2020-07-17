const { Room } = require('./things/things')

class Context {
  async load(username) {
    this._room = await Room.hub()
  }

  get room() { return this._room }
  set room(room) { this._room = room }
}

module.exports = Context
