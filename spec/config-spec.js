const Config = require('../mud/config')

describe("Config", function() {
  let scenarios = [
    { item: 'host', env: 'REDIS_HOST', value: 'guyroyse.com', fallback: 'localhost' },
    { item: 'port', env: 'REDIS_PORT', value: 9736, fallback: 6379 },
    { item: 'password', env: 'REDIS_PASSWORD', value: 'foobared', fallback: undefined },
    { item: 'graphKey', env: 'REDIS_GRAPH_KEY', value: 'noegnud', fallback: 'dungeon' }
  ]

  scenarios.forEach(scenario => {
    let { item, env, value, fallback } = scenario

    describe(`#${item}`, function() {
      it("has default value", function() {
        expect(Config[item]).to.equal(fallback)
      })
  
      it("pulls the value from the an environment variable", function() {
        process.env[env] = value
        expect(Config[item]).to.equal(value)
        delete process.env[env]
      })
    })  
  })
})
