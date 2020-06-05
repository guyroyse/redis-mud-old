const RedisConnector = require('./redis-connector')

class RedisGraphShim {
  constructor() {
    this.redisConnector = new RedisConnector()
    this.graph = this.redisConnector.fetchGraphConnection()
  }

  async execute(query, parameters) {
    await this.graph.query(query, parameters)
  }

  async executeAndReturnSingle(query, parameters) {
    let result = await this.graph.query(query, parameters)
    if (result.hasNext() === false) return null
    
    let record = result.next()
    if (record.size() <= 0) return null

    return this.recordToMap(record)
  }

  async executeAndReturnMany(query, parameters) {
    let result = await this.graph.query(query, parameters)

    let set = new Set()
    while (result.hasNext()) {
      let record = result.next()
      if (record.size() > 0) {
        let map = this.recordToMap(record)
        set.add(map)
      }
    }

    return set
  }

  recordToMap(record) {
    let values = record.values()
    let keys = record.keys()

    let map = new Map()
    keys.forEach((key, index) => map.set(key, values[index]))
    return map
  }

}

module.exports = RedisGraphShim
