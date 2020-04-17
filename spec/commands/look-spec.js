const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Look = require('../../mud/commands/look')

const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/room')

describe("Look", function() {

  beforeEach(function() {
    this.context = {
      dungeon: sinon.createStubInstance(Dungeon),
      room: sinon.createStubInstance(Room)
    }

    this.subject = new Look()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.context.room.name.returns('the room')
      this.context.room.description.returns('the description')
  
      this.response = this.subject.execute(this.context, "/look")
    })

    it("describes the current room", function() {
      expect(this.response).to.equal("[the room]: the description")
    })
  })
})
