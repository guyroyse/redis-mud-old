class EmoteCommand {
  execute(message) {
    let [ _, emote ] = message.match(/^\/emote (.*)$/)
    return `Player ${emote}`
  }

}

module.exports = EmoteCommand
