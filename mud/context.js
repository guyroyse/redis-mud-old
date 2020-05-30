const Dungeon = require('./things/dungeon')

class Context {

  async start() {
    this._dungeon = new Dungeon()
    this._room = await this.dungeon.rooms.fetchOrCreateHub()
  }

  get dungeon() { return this._dungeon }
  get room() { return this._room }

}

module.exports = Context
