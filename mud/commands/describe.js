class Describe {
  execute({ room }, message) {
    let [ , description ] = message.match(/^\/describe room (.*)$/)
    room.desc(description)
    return "Room description updated."
  }
}

module.exports = Describe
