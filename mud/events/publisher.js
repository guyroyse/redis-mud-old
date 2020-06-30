const RedisConnector = require('../data/redis-connector')

class EventPublisher {
  constructor() {
    this.connector = new RedisConnector()
  }

  say(context, message) {
    let connection = this.connector.fetchRedisConnection()
    let channel = `redismud:room:${context.room.id}`
    let event = { room: context.room.id, message: message }
    connection.publish(channel, JSON.stringify(event))
  } 
}

module.exports = EventPublisher
