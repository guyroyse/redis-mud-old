const RedisGraph = require("redisgraph.js").Graph

let graph = new RedisGraph("dungeon")

class Room {

  constructor({uuid, name, desc}) {
    this.uuid = uuid
    this.name = name
    this.desc = desc
  }

}

module.exports = Room
