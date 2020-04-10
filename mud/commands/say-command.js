class SayCommand {
  execute(stream, message) {
    stream.send(`You said: ${message}`)
    stream.send("")
  }
}

module.exports = SayCommand
