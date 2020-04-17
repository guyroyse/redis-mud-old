class LookCommand {
  execute({ room }) {
    return `[${room.name()}]: ${room.desc()}`
  }
}

module.exports = LookCommand
