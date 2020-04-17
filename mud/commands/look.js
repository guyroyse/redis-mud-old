class Look {
  execute({ room }) {
    return `[${room.name()}]: ${room.description()}`
  }
}

module.exports = Look
