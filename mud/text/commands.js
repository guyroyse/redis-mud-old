const { Room, Rooms } = require('../things/things')

class Describe {
  execute({ room }, message) {
    let [ , description ] = message.match(/^\/describe room (.*)$/)
    room.description = description
    return "Room description updated."
  }
}

class Emote {
  execute({}, message) {
    let [ , emote ] = message.match(/^\/emote (.*)$/)
    return `Player ${emote}`
  }
}

class Error {
  execute({}, message) {
    return `Invalid command '${message}'`
  }
}

class List {
  async execute(context) {
    let rooms = await Rooms.all()
    return rooms.map(room => `[${room.name}] ${room.id}`).join('\n')
  }
}

class Rename {
  execute({ room }, message) {
    let [ , name ] = message.match(/^\/rename room (.*)$/)
    room.name = name
    return "Room renamed."
  }
}

class Say {
  execute({}, message) {
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

module.exports = { Describe, Emote, List, Error, Rename, Say, Teleport }
