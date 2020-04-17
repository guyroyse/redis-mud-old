class Prompt {
  fetchPrompt({ room }) {
    return `You are in [${room.name()}]`
  }
}

module.exports = Prompt
