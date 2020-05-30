const { Look } = require('../../mud/text/commands')

const CURRENT_ROOM_ID = 23
const CURRENT_ROOM_NAME = 'The Red Room'
const CURRENT_ROOM_DESCRIPTION = 'The Red Room is red.'

const A_DOOR_ID = 13
const A_DOOR_NAME = 'The Big Door'
const A_DOOR_DESCRIPTION = 'The Big Door is big'

const ANOTHER_DOOR_ID = 42
const ANOTHER_DOOR_NAME = 'The Bigger Door'
const ANOTHER_DOOR_DESCRIPTION = "It's even bigger"

describe("Look", function() {
  beforeEach(function() {
    this.currentRoom = createStubRoom(CURRENT_ROOM_ID, CURRENT_ROOM_NAME, CURRENT_ROOM_DESCRIPTION)
    this.aDoor = createStubDoor(A_DOOR_ID, A_DOOR_NAME, A_DOOR_DESCRIPTION)
    this.anotherDoor = createStubDoor(ANOTHER_DOOR_ID, ANOTHER_DOOR_NAME, ANOTHER_DOOR_DESCRIPTION)

    this.context = createStubContext(null, this.currentRoom)

    this.subject = new Look()
  })

  describe("#execute", function() {
    context("when there are no doors", function() {
      beforeEach(async function() {
        this.context.room.doors.resolves([])
        this.response = stripAnsi(await this.subject.execute(this.context, "/look"))
      })
  
      it("returns the room description", function() {
        expect(this.response).to.equal(CURRENT_ROOM_DESCRIPTION)
      })  
    })

    context("when there are doors", function() {
      beforeEach(async function() {
        this.context.room.doors.resolves([this.aDoor, this.anotherDoor])
        this.response = stripAnsi(await this.subject.execute(this.context, "/look"))
      })
  
      it("returns the description and all the doors", function() {
        let expected =
          `${CURRENT_ROOM_DESCRIPTION}\n` +
          `Doors: ${A_DOOR_NAME} [${A_DOOR_ID}], ${ANOTHER_DOOR_NAME} [${ANOTHER_DOOR_ID}]`
        expect(this.response).to.equal(expected)
      })  
    })
  })
})
