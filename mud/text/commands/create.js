const Builder = require('../builder')
const { Room, Door } = require('../../things/things')

const Parsers = require('./argument-parsers')

class Create {
  async execute(context, message) {
    let match = message.match(/^\/create\s+(door|room)\s+.*$/)

    if (!match) return new Builder().red("INVALID COMMAND").white(":").space().green("Ye can't get ye flask.").build()

    let subcommand = match[1]

    let subcommandMap = { door: CreateDoor, room: CreateRoom }

    let delegate = new subcommandMap[subcommand]()
    return await delegate.execute(context, message)
  }
}

class CreateRoom {
  async execute(context, message) {
    let match = message.match(/^\/create\s+room\s+(.*)$/)
    let args = match[1]

    let name = Parsers.name(args)
    let room = await Room.create(name)
    return `Room '${room.name}' created with ID of ${room.id}.`
  }
}

class CreateDoor {
  async execute(context, message) {
    let match = message.match(/^\/create\s+door\s+(.*)$/)
    let args = match[1]

    let name = Parsers.name(args)
    let destinations = Parsers.destinations(args, [])
    let locations = Parsers.locations(args, [context.room.id])

    let door = await Door.create(name)
    await Promise.all(locations.map(location => door.placeIn(location)))
    await Promise.all(destinations.map(destination => door.addDestination(destination)))

    return `Door '${door.name}' created with ID of ${door.id}.`
  }
}

module.exports = Create
