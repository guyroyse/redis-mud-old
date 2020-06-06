const { Teleport } = require('../../../mud/text/commands')

const { Room }  = require('../../../mud/things/things')

describe("Teleport", function() {
  beforeEach(function() {
    this.currentRoom = createCurrentRoom()
    this.context = createStubContext(this.currentRoom)

    this.subject = new Teleport()
  })

  describe(`/teleport ${A_ROOM_ID}`, function() {
    beforeEach(async function() {
      this.destinationRoom = createARoom()

      sinon.stub(Room, 'byId')
      Room.byId.resolves(this.destinationRoom)

      this.response = await this.subject.execute(this.context, `/teleport ${A_ROOM_ID}`)
    })

    it("update the context with the new room", function() {
      expect(this.context.room).to.equal(this.destinationRoom)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Teleported to [${this.destinationRoom.name}].`)
    })
  })
})
