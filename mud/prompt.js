class Prompt {
  fetchPrompt({ room }) {
    return [
      "",
      `You are in [${this.currentRoom.name()}]` ]
  }
}

module.exports = Prompt
