const RedisGraphShim = require('./redis-graph-shim')

const Room = require('./room')

const NULL_UUID = '00000000-0000-0000-0000-000000000000'

class Dungeon {

  constructor() {
    this.shim = new RedisGraphShim()
  }

  open() {
    this.shim.open('dungeon')
  }

  close() {
    this.shim.close()
  }

  async fetchOrCreateHub() {

    const MERGE_HUB = `MERGE (r:room { uuid: '${NULL_UUID}' }) ON CREATE SET r.name='The Hub', r.desc='Huge hub is huge' RETURN r`

    let props = await this.shim.fetchSingleNode(MERGE_HUB, "r")

    return new Room(props)
  }

}

module.exports = Dungeon
