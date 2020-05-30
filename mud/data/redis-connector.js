const redis = require('redis')
const RedisGraph = require('redisgraph.js').Graph

const Config = require('../config')

class RedisConnector {
  fetchConnection() {
    if (!this._connection) this._connection = redis.createClient({
      host: Config.host,
      port: Config.port,
      password: Config.password
    })
    return this._connection
  }
  
  fetchGraphConnection() {
    if (!this.graph) this.graph = new RedisGraph(Config.graphKey, this.fetchConnection())
    return this.graph
  }

  close() {
    this._connection.close()
  }
}

module.exports = RedisConnector