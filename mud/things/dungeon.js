const RedisGraphShim = require('../data/redis-graph-shim')
const Queries = require('../data/queries')

const Room = require('./room')
const Door = require('./door')
const User = require('./user')

class Dungeon {

  open() {
    this.shim = new RedisGraphShim()
    this.shim.open('dungeon')
  }

  close() {
    this.shim.close()
  }

  async placeUserInRoom(idOccupant, idResidence) {
    await this.shim.execute(Queries.VACATE, { idOccupant })
    await this.shim.execute(Queries.OCCUPY, { idOccupant, idResidence })
  }

  async fetchResidence(idOccupant){
    let values = await this.shim.executeAndReturnSingle(Queries.FETCH_OCCUPANT_ROOM, {idOccupant})
    return Room.fromValues(values)
  }

  async fetchRoomList() {
    let valueSet = await this.shim.executeAndReturnMany(Queries.FETCH_ALL_ROOMS)
    return valueSet.map(values => Room.fromValues(values))
  }

  async fetchUserList() {
    let valueSet = await this.shim.executeAndReturnMany(Queries.FETCH_ALL_USERS)
    return valueSet.map(values => User.fromValues(values))
  }

  async fetchUser(id) {
    let values = await this.shim.executeAndReturnSingle(Queries.FETCH_USER, {id})
    return User.fromValues(values)
  }

  async deleteUser(id) {
    await this.shim.execute(Queries.DELETE_USER, { id })
  }

  async createUser(name){
    let values = await this.shim.executeAndReturnSingle(Queries.CREATE_USER, { name })
    return User.fromValues(values)
  }

  async fetchRoom(id) {
    let values = await this.shim.executeAndReturnSingle(Queries.FETCH_ROOM, {id})
    return Room.fromValues(values)
  }

  async fetchOrCreateHub() {
    let values = await this.shim.executeAndReturnSingle(Queries.FETCH_OR_CREATE_HUB,
      { name: 'The Hub', description: 'Huge hub is huge' })
    return Room.fromValues(values)
  }

  async createRoom(name) {
    let values = await this.shim.executeAndReturnSingle(Queries.CREATE_ROOM,
      { name, description: 'This is a room.' })
    return Room.fromValues(values)
  }

  async createPortal(name) {
    let values = await this.shim.executeAndReturnSingle(Queries.CREATE_PORTAL,
      { name, description: 'This is a portal.' })
    return Room.fromValues(values)
  }

  async createDoor({ name, from, to }) {
    let values = await this.shim.executeAndReturnSingle(Queries.CREATE_DOOR,
      { name, description: 'This is a door.', from, to })
    return this.doorFromValues(values)
  }

  async updateRoom(id, name, description) {
    await this.shim.execute(Queries.UPDATE_ROOM, { id, name, description })
  }

  doorFromValues(values) {
    return new Door(this, {
      id: values[0],
      name: values[1],
      description: values[2],
      from: values[3],
      to: values[4]
    })
  }
}

module.exports = Dungeon
