class Look {
  execute({ room }) {
    return `[${room.name()}]: ${room.desc()}`
  }
}

module.exports = Look
