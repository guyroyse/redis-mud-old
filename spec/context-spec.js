const Context = require('../mud/context')
const { Room, User } = require('../mud/things/things')
const { expect } = require('chai')

describe("Context", function() {
  beforeEach(function() {
    this.subject = new Context()
  })

  context("when loaded", function() {
    beforeEach(async function() {
      this.aHub = Room.proxy(createHubMap())
      this.aRoom = Room.proxy(createARoomMap())
      this.aUser = User.proxy(createAUserMap())

      sinon.stub(Room, 'hub').resolves(this.aHub)
      sinon.stub(User, 'byName').resolves(this.aUser)
    })

    context("and the user is in a room", function() {
      beforeEach(async function() {
        sinon.stub(Room, 'forUser').resolves(this.aRoom)
        await this.subject.load('bob')
      })

      it("makes the room the user's current room", function() {
        expect(this.subject.room).to.equal(this.aRoom)
      })
  
      it("makes 'bob' the current user", function() {
        expect(this.subject.user).to.equal(this.aUser)
      })  
    })

    context("and the user is not in a room", function() {
      beforeEach(async function() {
        sinon.stub(Room, 'forUser')
        Room.forUser.onFirstCall().resolves(null)
        Room.forUser.onSecondCall().resolves(this.aHub)
        sinon.stub(User.prototype, 'placeInHub')
        await this.subject.load('bob')
      })

      it("puts the user in the hub", function() {
        expect(this.aUser.placeInHub).to.have.been.called
        expect(this.subject.room).to.equal(this.aHub)
      })

      it("makes the room the hub", function() {
        expect(this.subject.room).to.equal(this.aHub)
      })
  
      it("makes 'bob' the current user", function() {
        expect(this.subject.user).to.equal(this.aUser)
      })  
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
