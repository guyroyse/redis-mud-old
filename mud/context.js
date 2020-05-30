const Dungeon = require('./things/dungeon')

class Context {
  constructor(dungeon) {
    this._dungeon = dungeon || new Dungeon()
  }

  async load() {
    this._room = await this._dungeon.rooms.fetchOrCreateHub()
  }

  get dungeon() { return this._dungeon }
  get room() { return this._room }
  set room(room) { this._room = room }
}

module.exports = Context
