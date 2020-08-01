const { Room, User } = require('./things/things')

class Context {
  async load(username) {
    this._user = await User.byName(username)
    this._room = await this._user.currentRoom()
    if (!this._room) {
      await this._user.placeInHub()
      this._room = await Room.hub()
    }
  }

  get room() { return this._room }
  set room(room) { this._room = room }

  get user() { return this._user }
}

module.exports = Context
