const Context = require('../mud/context')
const Dungeon = require('../mud/things/dungeon')
const Doors = require('../mud/things/doors/doors')
const Rooms = require('../mud/things/rooms/rooms')

describe("Context", function() {
  beforeEach(function() {
    this.subject = new Context()
  })

  context("when loaded", function() {
    beforeEach(async function() {
      let doors = sinon.createStubInstance(Doors)
      let rooms = sinon.createStubInstance(Rooms)  
      this.currentRooom = createCurrentRoom()

      sinon.stub(Dungeon.prototype, 'open')
      sinon.stub(Dungeon.prototype, 'doors').get(() => doors)
      sinon.stub(Dungeon.prototype, 'rooms').get(() => rooms)

      rooms.fetchOrCreateHub.resolves(this.currentRooom)

      await this.subject.load()
    })

    it("opens the dungeon", function() {
      expect(Dungeon.prototype.open).to.have.been.called
    })

    it("fetches the hub", function() {
      expect(Dungeon.prototype.rooms.fetchOrCreateHub).to.have.been.called
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
