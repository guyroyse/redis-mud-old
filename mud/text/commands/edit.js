const { Room, Door } = require('../../things/things')
const { Error } = require('../commands')

const Parsers = require('./parsers')

class Edit {
  async execute(context, message) {

    let subcommand = Parsers.subcommand(message)
    let args = Parsers.args(message)
    let id = Parsers.id(args)

    if (subcommand === 'room') {

      let room = await Room.byId(id)
  
      let name = Parsers.stringValue('name', args)
      if (name) room.name = name
  
      let description = Parsers.stringValue('description', args, room.description)
      if (description) room.description = description
  
      if (room.id === context.room.id) context.room = room
  
      return `Updated room with ID of ${room.id}.`
    }

    if (subcommand === 'door') {
      let door = await Door.byId(id)

      let name = Parsers.stringValue('name', args)
      if (name) door.name = name

      let description = Parsers.stringValue('description', args)
      if (description) door.description = description

      return `Updated door with ID of ${door.id}.`

    }

    return await new Error().execute(context, message)

  }
}

module.exports = { Edit }
