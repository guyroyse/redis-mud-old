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

  async fetchSingleNode(query) {
    let result = await this.graph.query(query)
    if (result.hasNext() === false) return null
    
    let record = result.next()
    if (record.size() <= 0) return null

    return record.values()[0].properties
  }

  async updateNode(query) {
    await this.graph.query(query)
  }

  async executeQueryAndReturnValue(query) {
    let result = await this.graph.query(query)
    if (result.hasNext() === false) return null

    let record = result.next()
    if (record.size() <= 0) return null

    return record.values()[0]
  }

}

module.exports = RedisGraphShim
