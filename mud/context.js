const { Room, User } = require('./things/things')

class Context {
  async load(username) {
    this._room = await Room.hub()
    this._user = await User.byName(username)
  }

  get room() { return this._room }
  set room(room) { this._room = room }

  get user() { return this._user }
}

module.exports = Context
