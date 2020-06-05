const Builder = require('./builder')
const Rooms = require('../things/rooms/rooms')
const Room = require('../things/rooms/room')
const Door = require('../things/doors/door')

class Create {
  async execute(context, message) {
    let match = message.match(/^\/create (door|room) (.*)$/)

    if (!match) return new Builder().red("INVALID COMMAND").white(":").space().green("Ye can't get ye flask.").build()

    let [ , noun, name ] = match
    if (noun === 'door') return await this.createDoor(context.dungeon, name, context.room.id)
    if (noun === 'room') return await this.createRoom(context.dungeon, name)
  }

  async createDoor(dungeon, args, roomId) {
    let match = args.match(/^(.*) to=(\d+)$/)
    if (!match) match = args.match(/^(.*)$/)

    let [ , name, destination] = match

    let door = await Door.create(name)
    await door.placeIn(roomId)

    if (destination) {
      let destinationRoomId = Number(destination)
      await door.addDestination(destinationRoomId)
    }
    
    return `Door '${door.name}' created with ID of ${door.id}.`
  }

  async createRoom(dungeon, name) {
    let room = await Room.create(name)
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
  async execute(context) {
    let rooms = await Rooms.all()
    return rooms.map(room => `[${room.name}] ${room.id}`).join('\n')
  }
}

class Look {
  async execute(context) {
    let doors = await context.room.doors()

    let roomBuilder = new Builder()
    roomBuilder.text(context.room.description)

    if (doors.length > 0) {
      roomBuilder.nl().bright().green("Doors: ").normal()

      let doorsText = doors.map(door => {
        return new Builder()
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
    let room = await Room.byId(Number(id))
    context.room = room
    return `Teleported to [${room.name}].`
  }
}

class Use {
  async execute(context, message) {
    let [ , id ] = message.match(/^\/use (.*)$/)

    let doors = await context.room.doors()
    let door = doors.find(door => door.id === Number(id))
    let rooms = await door.destinations()
    if (rooms.length > 0) {
      context.room = rooms[0]
      return `You moved.`
    } else {
      return `This door won't open. Perhaps it needs a key?`
    }
  }
}

module.exports = { Describe, Create, Emote, List, Error, Look, Rename, Say, Teleport, Use }
