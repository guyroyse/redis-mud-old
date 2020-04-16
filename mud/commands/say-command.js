class SayCommand {
  execute({}, message) {
    return `You said: ${message}`
  }
}

module.exports = SayCommand
