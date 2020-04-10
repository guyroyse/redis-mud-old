class EmoteCommand {
  constructor(message) {
    this.message = message
  }

  execute(stream) {
    stream.send(`You ${this.message}`)
    stream.send("")
  }

}

module.exports = EmoteCommand
