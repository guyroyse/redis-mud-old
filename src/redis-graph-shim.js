const RedisGraph = require('redisgraph.js').Graph

class RedisGraphShim {

  constructor(key) {
    this.graph = new RedisGraph(key)
  }

  async fetchSingleNode(query, nodeName) {
    let result = await this.graph.query(query)

    if (result.hasNext()) {
      return result.next().get(nodeName).properties
    }

    return null
  }

}

module.exports = RedisGraphShim
