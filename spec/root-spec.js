const sinon = require('sinon')

const RedisConnector = require('../mud/data/redis-connector')
const RedisGraphShim = require('../mud/data/redis-graph-shim')

beforeEach(function() {
  sinon.stub(RedisConnector.prototype, 'fetchRedisConnection')
  sinon.stub(RedisConnector.prototype, 'fetchGraphConnection')
  sinon.stub(RedisGraphShim.prototype, 'execute')
  sinon.stub(RedisGraphShim.prototype, 'executeAndReturnSingle')
  sinon.stub(RedisGraphShim.prototype, 'executeAndReturnMany')
})

afterEach(function() {
  sinon.restore()
})
