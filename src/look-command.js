class LookCommand {
  constructor(room) {
    this.room = room
  }

  execute(command, stream) {
    stream.send("")
    stream.send(`[${this.room.name()}]: ${this.room.desc()}`)
  }
}

module.exports = LookCommand
