class SayCommand {
  execute(message, room) {
    return `You said: ${message}`
  }
}

module.exports = SayCommand
