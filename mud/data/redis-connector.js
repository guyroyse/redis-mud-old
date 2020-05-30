const redis = require('redis')
const RedisGraph = require('redisgraph.js').Graph

const Config = require('../config')

class RedisConnector {
  fetchConnection() {
    if (!this.connection) this.connection = redis.createClient({
      host: Config.host,
      port: Config.port,
      password: Config.password
    })
    return this.connection
  }
  
  fetchGraphConnection() {
    if (!this.graph) this.graph = new RedisGraph(Config.graphKey, this.fetchConnection())
    return this.graph
  }

  close() {
    this.connection.close()
  }
}

module.exports = RedisConnector
