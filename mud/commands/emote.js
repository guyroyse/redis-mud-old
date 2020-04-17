class EmoteCommand {
  execute({}, message) {
    let [ , emote ] = message.match(/^\/emote (.*)$/)
    return `Player ${emote}`
  }
}

module.exports = EmoteCommand
