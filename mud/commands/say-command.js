class SayCommand {
  constructor(message) {
    this.message = message
  }

  execute(stream) {
    stream.send(`You said: ${this.message}`)
    stream.send("")
  }
}

module.exports = SayCommand
