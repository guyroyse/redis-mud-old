const RedisConnector = require('./redis-connector')

class RedisGraphShim {
  constructor() {
    this.redisConnector = new RedisConnector()
  }

  async execute(query, parameters) {
    await this.connection.query(query, parameters)
  }

  async executeAndReturnSingle(query, parameters) {
    let result = await this.connection.query(query, parameters)
    if (result.hasNext() === false) return null
    
    let record = result.next()
    if (record.size() <= 0) return null

    return record.values()
  }

  async executeAndReturnMany(query, parameters) {
    let result = await this.connection.query(query, parameters)

    let valueSet = []
    while (result.hasNext()) {
      let record = result.next()
      if (record.size() > 0) {
        valueSet.push(record.values())
      }
    }

    return valueSet
  }

  get connection() {
    return this.redisConnector.fetchGraphConnection()
  }
}

module.exports = RedisGraphShim
