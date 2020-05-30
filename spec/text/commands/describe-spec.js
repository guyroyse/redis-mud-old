const { Describe } = require('../../../mud/text/commands')

describe("Describe", function() {
  beforeEach(function() {
    this.currentRoom = createCurrentRoom()
    this.context = createStubContext(null, this.currentRoom)
    this.subject = new Describe()
  })

  describe("/describe room This room is big and ugly.", function() {
    beforeEach(async function() {
      this.response = await this.subject.execute(this.context, "/describe room This room is big and ugly.")
    })

    it("redescribes the current room", function() {
      expect(this.context.room.description).to.not.equal(CURRENT_ROOM_DESCRIPTION)
      expect(this.context.room.description).to.equal("This room is big and ugly.")
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal("Room description updated.")
    })
  })
})
