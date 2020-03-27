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

    let result = await this.graph.query(FETCH_HUB)
    if (!result.hasNext()) {
      result = await this.graph.query(CREATE_AND_FETCH_HUB)
    }

    let record = result.next()
    return new Room(record.get("r").properties)
  }

}

module.exports = Dungeon
