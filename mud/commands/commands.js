class Create {
  async execute({ dungeon, room }, message) {
    let match = message.match(/^\/create (door|room) (.*)$/)

    if (!match) return "INVALID COMMAND: Ye can't get ye flask."

    let [ , noun, name ] = match
    if (noun === 'door') return await this.createDoor(dungeon, name, room.id())
    if (noun === 'room') return await this.createRoom(dungeon, name)
  }

  async createDoor(dungeon, name, room_id) {
    let door_id = await dungeon.createDoor(name, room_id)
    return `Door '${name}' created with ID of ${door_id}.`
  }

  async createRoom(dungeon, name) {
    let id = await dungeon.createRoom(name)
    return `Room '${name}' created with ID of ${id}.`
  }

}

class Describe {
  execute({ room }, message) {
    let [ , description ] = message.match(/^\/describe room (.*)$/)
    room.description(description)
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
    let rooms = await dungeon.fetchRoomList()
    return rooms.map(room => `[${room.name()}] ${room.id()}`).join('\n')
  }
}

class Look {
  execute({ room }) {
    return `[${room.name()}]: ${room.description()}`
  }
}

class Rename {
  execute({ room }, message) {
    let [ , name ] = message.match(/^\/rename room (.*)$/)
    room.name(name)
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
    let room = await context.dungeon.fetchRoom(Number(id))
    context.room = room
    return `Teleported to [${room.name()}].`
  }
}

module.exports = { Describe, Create, Emote, List, Error, Look, Rename, Say, Teleport }
