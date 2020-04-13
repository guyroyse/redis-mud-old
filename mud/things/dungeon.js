const RedisGraphShim = require('../data/redis-graph-shim')

const Room = require('./room')

const NULL_UUID = '00000000-0000-0000-0000-000000000000'

class Dungeon {

  open() {
    this.shim = new RedisGraphShim()
    this.shim.open('dungeon')
  }

  close() {
    this.shim.close()
  }

  async fetchOrCreateHub() {
    let props = await this.shim.fetchSingleNode(`
      MERGE
        (r:room { uuid: '${NULL_UUID}' })
      ON CREATE SET 
        r.name = 'The Hub',
        r.desc = 'Huge hub is huge'
      RETURN r`)

    return new Room(this, props)
  }

  async updateRoom(uuid, name, desc) {
    await this.shim.updateNode(`
      MERGE
        (r:room { uuid: '${uuid}' })
      ON MATCH SET
        r.name = '${name}',
        r.desc = '${desc}'`)
  }

}

module.exports = Dungeon
