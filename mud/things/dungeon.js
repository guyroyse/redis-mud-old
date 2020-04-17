const RedisGraphShim = require('../data/redis-graph-shim')

const Room = require('./room')

const NULL_UUID = '00000000-0000-0000-0000-000000000000'

class Dungeon {

  open() {
    this.shim = new RedisGraphShim()
    this.shim.open('dungeon')
  }

  close() {
    this.shim.close()
  }

  async fetchRoomList() {
    let valueSet = await this.shim.executeAndReturnMany(`
      MATCH (r:room)
      RETURN 
        id(r), r.name, r.description`)

    return valueSet.map(values => this.roomFromValues(values))
  }

  async fetchOrCreateHub() {
    let values = await this.shim.executeAndReturnSingle(`
      MERGE
        (r:room { hub: 'true' })
      ON CREATE SET
        r.name = 'The Hub',
        r.description = 'Huge hub is huge',
        r.hub = 'true'
      RETURN
        id(r), r.name, r.description`)

    return this.roomFromValues(values)
  }

  async createRoom(name) {
    let values = await this.shim.executeAndReturnSingle(`
      CREATE
        (r:room { name: '${name}', description: 'This is a room.' })
      RETURN
        id(r), r.name, r.description`)

    return this.roomFromValues(values)
  }

  async updateRoom(id, name, description) {
    await this.shim.execute(`
      MATCH (r:room) WHERE id(r) = ${id}
      MERGE (r)
      ON MATCH SET
        r.name = '${name}',
        r.description = '${description}'`)
  }

  roomFromValues(values) {
    return new Room(this, {
      id: values[0],
      name: values[1],
      description: values[2]
    })
  }
}

module.exports = Dungeon
