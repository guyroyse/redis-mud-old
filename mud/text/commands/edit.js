const { Room } = require('../../things/things')

const Parsers = require('./parsers')

class Edit {
  async execute(context, message) {
    let args = Parsers.args(message)
    let id = Parsers.id(args)

    let room = await Room.byId(id)

    let name = Parsers.stringValue('name', args)
    if (name) room.name = name

    let description = Parsers.stringValue('description', args, room.description)
    if (description) room.description = description
  }
}

module.exports = { Edit }
