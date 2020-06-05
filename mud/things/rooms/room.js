const Thing = require('../thing')

class Room extends Thing {
  async doors() {
    return await this.dungeon.doors.inRoom(this.id)
  }

  update() {
    this.dungeon.rooms.update(this.map)
  }
}

module.exports = Room
