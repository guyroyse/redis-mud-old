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

    return record.values()
  }

  async executeAndReturnMany(query, parameters) {
    let result = await this.graph.query(query, parameters)

    let valueSet = []
    while (result.hasNext()) {
      let record = result.next()
      if (record.size() > 0) {
        valueSet.push(record.values())
      }
    }

    return valueSet
  }

}

module.exports = RedisGraphShim
