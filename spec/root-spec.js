const sinon = require('sinon')

const RedisConnector = require('../mud/data/redis-connector')

beforeEach(function() {
  sinon.stub(RedisConnector.prototype, 'fetchGraphConnection')
  sinon.stub(RedisConnector.prototype, 'fetchConnection')
})

afterEach(function() {
  sinon.restore()
})
