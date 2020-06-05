const Queries = require('./room-queries')
const Room = require('./room')

class Rooms {
  constructor(dungeon, shim) {
    this._shim = shim
    this._dungeon = dungeon
  }

  async fetchOrCreateHub() {
    let name = 'The Hub'
    let description = 'Huge hub is huge'
    let map = await this._shim.executeAndReturnSingle(Queries.FETCH_OR_CREATE_HUB, { name, description })
    return this.fromMap(map)
  }

  async all() {
    let set = await this._shim.executeAndReturnMany(Queries.FETCH_ALL)
    return this.fromSet(set)
  }

  async byId(id) {
    let map = await this._shim.executeAndReturnSingle(Queries.FETCH_BY_ID, {id})
    return this.fromMap(map)
  }

  async asDoorDestination(doorId) {
    let set = await this._shim.executeAndReturnMany(Queries.FETCH_AS_DOOR_DESTINATION, { doorId })
    this.fromSet(set)
  }

  async create(name) {
    let description = "This is a room."
    let map = await this._shim.executeAndReturnSingle(Queries.CREATE, { name, description })
    return this.fromMap(map)
  }

  async update(map) {
    let params = Array.from(map)
      .reduce((params, [k, v]) => {
        params[k] = v
        return params
      }, {})
    await this._shim.execute(Queries.UPDATE, params)
  }

  fromSet(set) {
    return Array.from(set)
      .reduce((newSet, map) => {
        return newSet.add(this.fromMap(map))
      }, new Set())
  }

  fromMap(map) {
    return Room.proxy(this._dungeon, map)
  }
}

module.exports = Rooms
