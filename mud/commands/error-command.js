class ErrorCommand {
  execute(message) {
    return `Invalid command '${message}'`
  }
}

module.exports = ErrorCommand
