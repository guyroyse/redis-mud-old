class ErrorCommand {
  execute(stream, message) {
    stream.send(`Invalid command '${message}'`)
    stream.send("")
  }

}

module.exports = ErrorCommand
