class LookCommand {
  constructor(room) {
    this.room = room
  }

  execute(stream) {
    return `[${this.room.name()}]: ${this.room.desc()}`
  }
}

module.exports = LookCommand
