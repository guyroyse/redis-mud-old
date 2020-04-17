class List {
  async execute({ dungeon }) {
    let rooms = await dungeon.fetchRoomList()
    return rooms.map(room => `[${room.name()}] ${room.id()}`).join('\n')
  }
}

module.exports = List
