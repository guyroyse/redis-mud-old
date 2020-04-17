const Dungeon = require('./things/dungeon')

class Context {

  async start() {
    this.dungeon = new Dungeon()
    this.dungeon.open('dungeon')
    this.room = await this.dungeon.fetchOrCreateHub()
  }

}

module.exports = Context
