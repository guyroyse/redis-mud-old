const { Room, Door } = require('../../things/things')
const { Error } = require('../commands')

const Parsers = require('./argument-parsers')

class Create {
  async execute(context, message) {
    let match = message.match(/^\/create\s+(\S+)\s+.*$/)

    let delegateClass = Error
    if (match) {
      let subcommand = match[1]
      delegateClass = subcommandDelegateMap[subcommand] || Error
    }

    return await new delegateClass().execute(context, message)
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

let subcommandDelegateMap = { door: CreateDoor, room: CreateRoom }

module.exports = { Create, CreateRoom, CreateDoor }
