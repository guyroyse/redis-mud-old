class Prompt {
  fetchPrompt({ room }) {
    return {'messages': [
      `You are in [${room.name()}]`
    ]}
  }
}

module.exports = Prompt
