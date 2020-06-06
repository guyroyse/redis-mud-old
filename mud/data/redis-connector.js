const redis = require('redis')
const RedisGraph = require('redisgraph.js').Graph

const Config = require('../config')

function createRedisConnection() {
  return redis.createClient({
    host: Config.host,
    port: Config.port,
    password: Config.password
  })
}

function createGraphConnection() {
  return new RedisGraph(Config.graphKey, this.createRedisConnection())
}

let redisConnection, graphConnection

class RedisConnector {
  fetchRedisConnection() {
    if (!redisConnection) redisConnection = createRedisConnection()
    return redisConnection
  }
  
  fetchGraphConnection() {
    if (!graphConnection) graphConnection = createGraphConnection()
    return graphConnection
  }
}

module.exports = RedisConnector