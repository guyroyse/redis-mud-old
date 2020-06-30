const RedisConnector = require('../data/redis-connector')

class EventSubscriber {

  start(callback) {
    let connector = new RedisConnector()
    this.connection = connector.fetchSubscriberConnection()

    this.connection.on('pmessage', (pattern, channel, message) => {
      callback(message)
    })

    this.connection.psubscribe("redismud:*")
  }
}

module.exports = EventSubscriber
