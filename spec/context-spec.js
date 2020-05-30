const Context = require('../mud/context')

describe("Context", function() {
  beforeEach(function() {
    this.dungeon = createStubDungeon()
    this.subject = new Context(this.dungeon)
  })

  context("when loaded", function() {
    beforeEach(async function() {
      this.currentRooom = createCurrentRoom()
      this.dungeon.rooms.fetchOrCreateHub.resolves(this.currentRooom)
      await this.subject.load()
    })

    it("fetches the hub", function() {
      expect(this.dungeon.rooms.fetchOrCreateHub).to.have.been.called
    })

    it("makes the hub the current room", function() {
      expect(this.subject.room).to.equal(this.currentRooom)
    })

    context("when the room changes", function() {
      beforeEach(function() {
        this.aRoom = createARoom()
        this.subject.room = this.aRoom
      })

      it("changes the room", function() {
        expect(this.subject.room).to.equal(this.aRoom)
      })
    })
  })
})
