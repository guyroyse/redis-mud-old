class EmoteCommand {
  execute(message, room) {
    let [ _, emote ] = message.match(/^\/emote (.*)$/)
    return `Player ${emote}`
  }
}

module.exports = EmoteCommand
