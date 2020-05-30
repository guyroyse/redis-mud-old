const { Teleport } = require('../../mud/text/commands')

describe("Teleport", function() {

  beforeEach(function() {
    this.dungeon = createStubDungeon()
    this.currentRoom = createCurrentRoom()
    this.context = createStubContext(this.dungeon, this.currentRoom)

    this.subject = new Teleport()
  })

  describe("/teleport 42", function() {
    beforeEach(async function() {
      this.destinationRoom = createARoom()
      this.dungeon.rooms.byId.resolves(this.destinationRoom)
      this.response = await this.subject.execute(this.context, `/teleport ${A_ROOM_ID}`)
    })

    it("fetches the room by id", function() {
      expect(this.dungeon.rooms.byId).to.have.been.calledWith(A_ROOM_ID)
    })

    it("update the context with the new room", function() {
      expect(this.context.room).to.equal(this.destinationRoom)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Teleported to [${A_ROOM_NAME}].`)
    })
  })
})
