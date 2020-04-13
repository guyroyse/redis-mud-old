class DescribeCommand {
  execute(message, room) {
    let [ _, description ] = message.match(/^\/describe room (.*)$/)
    room.desc(description)
    return "Room description updated."
  }
}

module.exports = DescribeCommand
