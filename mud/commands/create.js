class Create {
  async execute({ dungeon }, message) {
    let [ , name ] = message.match(/^\/create room (.*)$/)
    let id = await dungeon.createRoom(name)
    return `Room '${name}' created with ID of ${id}.`
  }
}

module.exports = Create
