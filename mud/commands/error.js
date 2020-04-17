class Error {
  execute({}, message) {
    return `Invalid command '${message}'`
  }
}

module.exports = Error
