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

module.exports = Use
