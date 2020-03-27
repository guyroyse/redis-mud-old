const RedisGraph = require("redisgraph.js").Graph

const Room = require('./room')

const NULL_UUID = '00000000-0000-0000-0000-000000000000'

class Dungeon {

  constructor() {
    this.graph = new RedisGraph("dungeon")
  }

  async fetchOrCreateHub() {

    const FETCH_HUB = `MATCH (r:room { uuid: '${NULL_UUID}'}) RETURN r`

    const CREATE_AND_FETCH_HUB = `
      CREATE (r:room { 
        uuid: '${NULL_UUID}',
        name: 'The Hub',
        desc: 'Huge hub is huge.'})
      RETURN r`

    let record = await this.fetchSingleNode(FETCH_HUB)
    if (record === null) {
      record = await this.fetchSingleNode(CREATE_AND_FETCH_HUB)
    }

    return new Room(record.get("r").properties)
  }

  async fetchSingleNode(query) {
    let result = await this.graph.query(query)
    return result.hasNext() ? result.next() : null
  }

}

module.exports = Dungeon
