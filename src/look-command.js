class LookCommand {
  constructor(room) {
    this.room = room
  }

  execute() {
    return ["", `[${this.room.name}]: ${this.room.desc}`]
  }
}

module.exports = LookCommand
