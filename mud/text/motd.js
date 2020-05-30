let AnsiStringBuilder = require('./builder')

let messages = [
  "Beware. You are likely to be eaten by a grue.",
  "You can't get ye flask!",
  "I used to be an adventurer like you, then I took and arrow in the knee.",
  "I'll be here all week! Try the veal!",
  "You smell a wumpus."
]

class Motd {
  fetchMotd() {
    let message = messages[Math.floor(Math.random() * messages.length)]
    return new AnsiStringBuilder()
      .bright().green('Welcome to').space().red('RedisMUD!').nl()
      .normal().white(message).reset().build()
  }
}

module.exports = Motd
