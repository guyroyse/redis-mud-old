const Dungeon = require('./things/dungeon')

class Context {
  constructor() {
    this._dungeon = new Dungeon()
  }

  async load() {
    this._room = await this._dungeon.rooms.fetchOrCreateHub()
  }

  get dungeon() { return this._dungeon }
  get room() { return this._room }
}

module.exports = Context
