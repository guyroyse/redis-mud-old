class DescribeCommand {
  constructor(room) {
    this.room = room
  }

  execute(message) {
    let [ _, description ] = message.match(/^\/describe room (.*)$/)
    this.room.desc(description)
    return "Room description updated."
  }
}

module.exports = DescribeCommand
