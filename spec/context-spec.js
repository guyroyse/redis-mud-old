const Context = require('../mud/context')
const { Room, User } = require('../mud/things/things')

describe("Context", function() {
  beforeEach(function() {
    this.subject = new Context()
  })

  context("when loaded", function() {
    beforeEach(async function() {
      this.aRoom = createARoom()
      this.aUser = createAUser()

      sinon.stub(Room, 'hub').resolves(this.aRoom)
      sinon.stub(User, 'byId').resolves(this.aUser)

      await this.subject.load('bob')
    })

    it("makes the hub the current room", function() {
      expect(this.subject.room).to.equal(this.aRoom)
    })

    it("makes 'bob' the current user", function() {
      expect(this.subject.user).to.equal(this.aUser)
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
