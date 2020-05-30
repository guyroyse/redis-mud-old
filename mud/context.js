const Dungeon = require('./things/dungeon')

class Context {

  async start() {
    this.dungeon = new Dungeon()
    this.room = await this.dungeon.rooms.fetchOrCreateHub()
  }

}

module.exports = Context
