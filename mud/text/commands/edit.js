const { Room } = require('../../things/things')

const Parsers = require('./parsers')

class Edit {
  async execute(context, message) {
    let args = Parsers.args(message)
    let id = Parsers.id(args)
    let name = Parsers.stringValue('name', args)
    let room = await Room.byId(id)
    room.name = name
  }
}

module.exports = { Edit }
