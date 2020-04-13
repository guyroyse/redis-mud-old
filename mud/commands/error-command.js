class ErrorCommand {
  execute(message, room) {
    return `Invalid command '${message}'`
  }
}

module.exports = ErrorCommand
