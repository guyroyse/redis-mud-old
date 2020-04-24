const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Teleport = require('../../mud/commands/teleport')

const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/room')

describe("Teleport", function() {

  beforeEach(function() {
    this.context = {
      dungeon: sinon.createStubInstance(Dungeon),
      room: sinon.createStubInstance(Room)
    }

    this.subject = new Teleport()
  })

  context("when executed", function() {
    beforeEach(async function() {
      this.returnedRoom = sinon.createStubInstance(Room)
      this.returnedRoom.name.returns('the room')
      this.context.dungeon.fetchRoom.returns(this.returnedRoom)
      this.response = await this.subject.execute(this.context, "/teleport room 42")
    })

    it("fetches room 42", function() {
      expect(this.context.dungeon.fetchRoom).to.have.been.calledWith(42)
    })

    it("update the context with the new room", function() {
      expect(this.context.room).to.equal(this.returnedRoom)
    })

    it("reports the teleport", function() {
      expect(this.response).to.equal("Teleported to [the room].")
    })
  })
})
