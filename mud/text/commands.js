const Builder = require('./builder')

const { Room, Rooms } = require('../things/things')
const EventPublisher = require('../events/publisher')

class Emote {
  execute({}, message) {
    let [ , emote ] = message.match(/^\/emote (.*)$/)
    return `Player ${emote}`
  }
}

class Error {
  execute({}, message) {
    return new Builder()
      .green("Ye can't get ye flask!").space()
      .red("INVALID COMMAND").space()
      .white("'").cyan(message).white("'").build()
  }
}

class List {
  async execute(context) {
    let rooms = await Rooms.all()
    return rooms.map(room => `[${room.name}] ${room.id}`).join('\n')
  }
}

class Say {
  execute(context, message) {

    let publisher = new EventPublisher()
    publisher.say(context, message)

    return `You said: ${message}`
  }
}

class Teleport {
  async execute(context, message) {
    let [ , id ] = message.match(/^\/teleport (.*)$/)
    let room = await Room.byId(Number(id))
    context.room = room
    return `Teleported to [${room.name}].`
  }
}

module.exports = { Emote, List, Error, Say, Teleport }
