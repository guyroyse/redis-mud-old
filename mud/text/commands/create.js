const Builder = require('../builder')
const { Room, Door } = require('../../things/things')

class Create {
  async execute(context, message) {
    let match = message.match(/^\/create (door|room) (.*)$/)

    if (!match) return new Builder().red("INVALID COMMAND").white(":").space().green("Ye can't get ye flask.").build()

    let [ , noun, name ] = match
    if (noun === 'door') return await this.createDoor(name, context.room.id)
    if (noun === 'room') return await this.createRoom(name)
  }

  async createDoor(args, roomId) {
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

  async createRoom(name) {
    let room = await Room.create(name)
    return `Room '${room.name}' created with ID of ${room.id}.`
  }
}

module.exports = Create
