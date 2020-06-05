const { Look } = require('../../../mud/text/commands')

describe("Look", function() {
  beforeEach(function() {
    this.currentRoom = createCurrentRoom()
    this.context = createStubContext(this.currentRoom)
    this.subject = new Look()
  })

  describe("/look", function() {
    context("when there are no doors", function() {
      beforeEach(async function() {
        this.currentRoom.doors.resolves([])
        this.response = stripAnsi(await this.subject.execute(this.context, "/look"))
      })
  
      it("returns the room description", function() {
        expect(this.response).to.equal(this.currentRoom.description)
      })  
    })

    context("when there are doors", function() {
      beforeEach(async function() {
        this.aRoom = createARoom()
        this.anotherRoom = createAnotherRoom()
        this.aThirdRoom = createAThirdRoom()
        this.currentRoom.doors.resolves([this.aRoom, this.anotherRoom, this.aThirdRoom])
        this.response = stripAnsi(await this.subject.execute(this.context, "/look"))
      })
  
      it("returns the description and all the doors", function() {
        let expected =
          `${this.currentRoom.description}\n` +
          `Doors: ` +
            `${this.aRoom.name} [${this.aRoom.id}], ` +
            `${this.anotherRoom.name} [${this.anotherRoom.id}], ` +
            `${this.aThirdRoom.name} [${this.aThirdRoom.id}]`
        expect(this.response).to.equal(expected)
      })  
    })
  })
})
