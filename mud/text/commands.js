const AnsiStringBuilder = require('./builder')

class Create {
  async execute({ dungeon, room }, message) {
    let match = message.match(/^\/create (door|room) (.*)$/)

    if (!match) return "INVALID COMMAND: Ye can't get ye flask."

    let [ , noun, name ] = match
    if (noun === 'door') return await this.createDoor(dungeon, name, room.id())
    if (noun === 'room') return await this.createRoom(dungeon, name)
  }

  async createDoor(dungeon, name, room_id) {
    let door = await dungeon.doors.create(name, room_id)
    return `Door '${door.name}' created with ID of ${door.id}.`
  }

  async createRoom(dungeon, name) {
    let room = await dungeon.rooms.create(name)
    return `Room '${room.name}' created with ID of ${room.id}.`
  }

}

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
  async execute({ dungeon }) {
    let rooms = await dungeon.rooms.all()
    return rooms.map(room => `[${room.name}] ${room.id}`).join('\n')
  }
}

class Look {
  async execute(context) {
    let doors = await context.room.doors()

    let roomBuilder = new AnsiStringBuilder()
    roomBuilder.text(context.room.description)

    if (doors.length > 0) {
      roomBuilder.nl().bright().green("Doors: ").normal()

      let doorsText = doors.map(door => {
        return new AnsiStringBuilder()
          .cyan(`${door.name} [${door.id}]`).white().build()
      }).join(', ')

      roomBuilder.text(doorsText)
    }

    return roomBuilder.build()
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
    let room = await context.dungeon.rooms.byId(Number(id))
    context.room = room
    return `Teleported to [${room.name}].`
  }
}

module.exports = { Describe, Create, Emote, List, Error, Look, Rename, Say, Teleport }
