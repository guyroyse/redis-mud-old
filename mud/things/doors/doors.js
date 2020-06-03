const Queries = require('./door-queries')
const Door = require('./door')

class Doors {
  constructor(dungeon, shim) {
    this._dungeon = dungeon
    this._shim = shim
  }

  async inRoom(roomId) {
    let valueSet = await this._shim.executeAndReturnMany(Queries.IN_ROOM, { roomId })
    return valueSet.map(values => this.fromValues(values))
  }

  async create(name) {
    let description = "This is a door."
    let values = await this._shim.executeAndReturnSingle(Queries.CREATE, { name, description })
    return this.fromValues(values)
  }

  async placeIn(id, roomId) {
    await this._shim.execute(Queries.PLACE_IN, { id, roomId })
  }

  async addDestination(id, roomId) {
    await this._shim.execute(Queries.ADD_DESTINATION, { id, roomId })
  }

  async update(id, name, description) {
    await this._shim.execute(Queries.UPDATE, { id, name, description })
  }

  fromValues(values) {
    return new Door(this._dungeon, {
      id: values[0],
      name: values[1],
      description: values[2]
    })
  }
}

module.exports = Doors
