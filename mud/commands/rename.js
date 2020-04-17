class Rename {
  execute({ room }, message) {
    let [ , name ] = message.match(/^\/rename room (.*)$/)
    room.name(name)
    return "Room renamed."
  }
}

module.exports = Rename
