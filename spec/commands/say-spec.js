const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Say = require('../../mud/commands/say')

const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/room')

describe("Say", function() {

  beforeEach(function() {
    this.context = {
      dungeon: sinon.createStubInstance(Dungeon),
      room: sinon.createStubInstance(Room)
    }

    this.subject = new Say()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.room = sinon.createStubInstance(Room)
      this.response = this.subject.execute(this.context, "the message")
    })

    it("says the thing", function() {
      expect(this.response).to.equal("You said: the message")
    })
  })
})
