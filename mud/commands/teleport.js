class Teleport {
  async execute(context, message) {
    let [ , id ] = message.match(/^\/teleport room (.*)$/)
    let room = await context.dungeon.fetchRoom(Number(id))
    context.room = room
    return `Teleported to [${room.name()}].`
  }
}

module.exports = Teleport
