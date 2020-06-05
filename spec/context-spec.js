const Context = require('../mud/context')
const Room = require('../mud/things/rooms/room')

describe("Context", function() {
  beforeEach(function() {
    this.subject = new Context()
  })

  context("when loaded", function() {
    beforeEach(async function() {
      this.aRoom = createARoom()
      sinon.stub(Room, 'hub').resolves(this.aRoom)

      await this.subject.load()
    })

    it("makes the hub the current room", function() {
      expect(this.subject.room).to.equal(this.aRoom)
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
