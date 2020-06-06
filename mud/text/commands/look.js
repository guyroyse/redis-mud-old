const Builder = require('../builder')

class Look {
  async execute(context) {
    let doors = await context.room.doors()

    let roomBuilder = new Builder()
    roomBuilder.text(context.room.description)

    if (doors.length > 0) {
      roomBuilder.nl().bright().green("Doors: ").normal()

      let doorsText = doors.map(door => {
        return new Builder()
          .cyan(`${door.name} [${door.id}]`).white().build()
      }).join(', ')

      roomBuilder.text(doorsText)
    }

    return roomBuilder.build()
  }
}

module.exports = Look
