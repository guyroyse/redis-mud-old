const { Room, Door } = require('../../things/things')
const { Error } = require('../commands')

const Parsers = require('./parsers')

class Create {
  async execute(context, message) {
    let subcommand = Parsers.subcommand(message, 'unknown')
    let delegateClass = subcommandDelegateMap[subcommand] || Error
    return await new delegateClass().execute(context, message)
  }
}

class CreateRoom {
  async execute(context, message) {
    let args = Parsers.args(message)
    let name = Parsers.name(args)
    let room = await Room.create(name)
    return `Room '${room.name}' created with ID of ${room.id}.`
  }
}

class CreateDoor {
  async execute(context, message) {
    let args = Parsers.args(message)
    let name = Parsers.name(args)
    let destinations = Parsers.idList('to', args, [])
    let locations = Parsers.idList('from', args, [context.room.id])

    let door = await Door.create(name)
    await Promise.all(
      locations.map(location => door.placeIn(location))
        .concat(destinations.map(destination => door.addDestination(destination))))

    return `Door '${door.name}' created with ID of ${door.id}.`
  }
}

let subcommandDelegateMap = { door: CreateDoor, room: CreateRoom }

module.exports = { Create, CreateRoom, CreateDoor }
