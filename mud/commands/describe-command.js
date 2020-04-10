class DescribeCommand {
  constructor(room) {
    this.room = room
  }

  execute(stream, message) {
    let [ _, description ] = message.match(/^\/describe room (.*)$/)
    this.room.desc(description)

    stream.send("Room description updated.")
    stream.send("")
  }
}

module.exports = DescribeCommand
