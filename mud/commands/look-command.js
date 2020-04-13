class LookCommand {
  execute(message, room) {
    return `[${room.name()}]: ${room.desc()}`
  }
}

module.exports = LookCommand
