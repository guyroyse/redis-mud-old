const { Rename } = require('../../../mud/text/commands')

describe("Rename", function() {
  beforeEach(function() {
    this.currentRoom = createCurrentRoom()
    this.context = createStubContext(null, this.currentRoom)
    this.subject = new Rename()
  })

  context("/rename room The Fub", function() {
    beforeEach(async function() {
      this.response = await this.subject.execute(this.context, "/rename room The Fub")
    })

    it("renames the current room", function() {
      expect(this.context.room.name).to.not.equal(CURRENT_ROOM_NAME)
      expect(this.context.room.name).to.equal("The Fub")
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal("Room renamed.")
    })
  })
})
