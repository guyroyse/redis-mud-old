const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Look = require('../../mud/commands/look-command')
const Room = require('../../mud/things/room')

describe("Look", function() {

  beforeEach(function() {
    this.subject = new Look()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.room = sinon.createStubInstance(Room)
      this.room.name.returns('the room')
      this.room.desc.returns('the description')
  
      this.response = this.subject.execute("/look", this.room)
    })

    it("describes the current room", function() {
      expect(this.response).to.equal("[the room]: the description")
    })
  })
})
