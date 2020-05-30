const { Look } = require('../../mud/text/commands')

describe("Look", function() {
  beforeEach(function() {
    this.currentRoom = createCurrentRoom()
    this.context = createStubContext(null, this.currentRoom)
    this.subject = new Look()
  })

  describe("/look", function() {
    context("when there are no doors", function() {
      beforeEach(async function() {
        this.currentRoom.doors.resolves([])
        this.response = stripAnsi(await this.subject.execute(this.context, "/look"))
      })
  
      it("returns the room description", function() {
        expect(this.response).to.equal(CURRENT_ROOM_DESCRIPTION)
      })  
    })

    context("when there are doors", function() {
      beforeEach(async function() {
        this.currentRoom.doors.resolves([createADoor(), createAnotherDoor(), createAThirdDoor()])
        this.response = stripAnsi(await this.subject.execute(this.context, "/look"))
      })
  
      it("returns the description and all the doors", function() {
        let expected =
          `${CURRENT_ROOM_DESCRIPTION}\n` +
          `Doors: ` +
            `${A_DOOR_NAME} [${A_DOOR_ID}], ` +
            `${ANOTHER_DOOR_NAME} [${ANOTHER_DOOR_ID}], ` +
            `${A_THIRD_DOOR_NAME} [${A_THIRD_DOOR_ID}]`
        expect(this.response).to.equal(expected)
      })  
    })
  })
})
