const Builder = require('../builder')
const { Room, Door } = require('../../things/things')

class Create {
  async execute(context, message) {
    let match = message.match(/^\/create\s+(door|room)\s+(.*)$/)

    if (!match) return new Builder().red("INVALID COMMAND").white(":").space().green("Ye can't get ye flask.").build()

    let [ , noun, remainder ] = match
    if (noun === 'door') return await this.createDoor(remainder, context.room.id)
    if (noun === 'room') return await this.createRoom(remainder)
  }

  async createDoor(remainder, roomId) {

    let nameMatch = remainder.match(/^(\S+)/)
    let name = nameMatch ? nameMatch[1] : null
    if (name.startsWith('"')) {
      nameMatch = remainder.match(/^"(.*?)"/)
      name = nameMatch[1]
    }

    let toMatch = remainder.match(/\s+to=(\S+)/)
    let to = toMatch ? Number(toMatch[1]) : null

    let fromMatch = remainder.match(/\s+from=(\S+)/)
    let from = fromMatch ? Number(fromMatch[1]) : null

    let door = await Door.create(name)
    if (from) {
      await door.placeIn(from)
    } else {
      await door.placeIn(roomId)
    }

    if (to) {
      await door.addDestination(to)
    }
    
    return `Door '${door.name}' created with ID of ${door.id}.`
  }

  async createRoom(name) {
    let room = await Room.create(name)
    return `Room '${room.name}' created with ID of ${room.id}.`
  }
}

module.exports = Create
