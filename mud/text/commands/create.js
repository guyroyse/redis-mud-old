const Builder = require('../builder')
const { Room, Door } = require('../../things/things')

class Create {
  async execute(context, message) {
    let match = message.match(/^\/create\s+(door|room)\s+(.*)$/)

    if (!match) return new Builder().red("INVALID COMMAND").white(":").space().green("Ye can't get ye flask.").build()

    let [ , subcommand, args ] = match
    if (subcommand === 'door') return await this.createDoor(args, context.room.id)
    if (subcommand === 'room') return await this.createRoom(args)
  }

  async createDoor(args, roomId) {
    let name = this.parseName(args)
    let destinations = this.parseDestinations(args, [])
    let locations = this.parseLocations(args, [roomId])

    let door = await Door.create(name)
    await Promise.all(locations.map(location => door.placeIn(location)))
    await Promise.all(destinations.map(destination => door.addDestination(destination)))

    return `Door '${door.name}' created with ID of ${door.id}.`
  }

  async createRoom(args) {
    let name = this.parseName(args)
    let room = await Room.create(name)
    return `Room '${room.name}' created with ID of ${room.id}.`
  }

  parseName(args) {
    let match = args.match(/^(\S+)/)
    let name = match ? match[1] : null
    if (name.startsWith('"')) {
      match = args.match(/^"(.*?)"/)
      name = match[1]
    }
    return name
  }

  parseDestinations(args, defaultValue) {
    return this.parseIdList(args, /\s+to=(\S+)/, defaultValue)
  }

  parseLocations(args, defaultValue) {
    return this.parseIdList(args, /\s+from=(\S+)/, defaultValue)
  }

  parseIdList(args, regex, defaultValue) {
    let list = defaultValue
    let match = args.match(regex)
    if (match) {
      let tokens = match[1].split(',')
      list = tokens.map(token => Number(token))
    }
    return list
  }
}

module.exports = Create
