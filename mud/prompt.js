let AnsiStringBuilder = require('./ansi-string-builder')

class Prompt {
  fetchPrompt({ room }) {
    return new AnsiStringBuilder()
      .yellow('You are in').space()
      .magenta(`${room.name()} [${room.id()}]`)
      .reset()
      .build()
  }
}

module.exports = Prompt
