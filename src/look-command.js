class LookCommand {
  constructor(room) {
    this.room = room
  }

  execute(stream) {
    stream.send(`[${this.room.name()}]: ${this.room.desc()}`)
    stream.send("")
  }
}

module.exports = LookCommand
