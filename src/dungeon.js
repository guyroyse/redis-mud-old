const RedisGraph = require("redisgraph.js").Graph

const Room = require('./room')

const NULL_UUID = '00000000-0000-0000-0000-000000000000'

class Dungeon {

  constructor() {
    this.graph = new RedisGraph("dungeon")
  }

  async fetchOrCreateHub() {

    const MERGE_HUB = `
      MERGE (r:room { uuid: '${NULL_UUID}' })
      ON CREATE SET
        r.name='The Hub',
        r.desc='Huge hub is huge'
      RETURN r`

    let record = await this.fetchSingleNode(MERGE_HUB)

    return new Room(record.get("r").properties)
  }

  async fetchSingleNode(query) {
    let result = await this.graph.query(query)
    return result.hasNext() ? result.next() : null
  }

}

module.exports = Dungeon
