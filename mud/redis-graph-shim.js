const redis = require('redis')
const RedisGraph = require('redisgraph.js').Graph

class RedisGraphShim {

  open(key) {
    this.client = redis.createClient()
    this.graph = new RedisGraph(key, this.client)
  }

  close() {
    this.client.end(false)
  }

  async fetchSingleNode(query, nodeName) {
    let result = await this.graph.query(query)

    if (result.hasNext()) {
      return result.next().get(nodeName).properties
    }

    return null
  }

  async updateNode(query) {
    await this.graph.query(query)
  }

}

module.exports = RedisGraphShim
