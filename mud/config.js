class Config {
  static get port()     { return process.env.REDIS_PORT      || 6379 }
  static get host()     { return process.env.REDIS_HOST      || 'localhost' }
  static get password() { return process.env.REDIS_PASSWORD  || undefined }
  static get graphKey() { return process.env.REDIS_GRAPH_KEY || 'dungeon' }
}

module.exports = Config
