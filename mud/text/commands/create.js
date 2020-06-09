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
    let name = this.parseName(remainder)
    let destinations = this.parseDestinations(remainder, [])
    let locations = this.parseLocations(remainder, [roomId])

    let door = await Door.create(name)
    await Promise.all(locations.map(location => door.placeIn(location)))
    await Promise.all(destinations.map(destination => door.addDestination(destination)))

    return `Door '${door.name}' created with ID of ${door.id}.`
  }

  parseName(remainder) {
    let nameMatch = remainder.match(/^(\S+)/)
    let name = nameMatch ? nameMatch[1] : null
    if (name.startsWith('"')) {
      nameMatch = remainder.match(/^"(.*?)"/)
      name = nameMatch[1]
    }
    return name
  }

  parseDestinations(remainder, defaultValue) {
    let to = defaultValue
    let toMatch = remainder.match(/\s+to=(\S+)/)
    if (toMatch) {
      let tokens = toMatch[1].split(',')
      to = tokens.map(token => Number(token))
    }
    return to
  }

  parseLocations(remainder, defaultValue) {
    let from = defaultValue
    let fromMatch = remainder.match(/\s+from=(\S+)/)
    if (fromMatch) {
      let tokens = fromMatch[1].split(',')
      from = tokens.map(token => Number(token))
    }
    return from
  }

  async createRoom(name) {
    let room = await Room.create(name)
    return `Room '${room.name}' created with ID of ${room.id}.`
  }
}

module.exports = Create
