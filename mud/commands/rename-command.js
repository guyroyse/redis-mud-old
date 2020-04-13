class RenameCommand {
  execute(message, room) {
    let [ _, name ] = message.match(/^\/rename room (.*)$/)
    room.name(name)
    return "Room renamed."
  }
}

module.exports = RenameCommand
