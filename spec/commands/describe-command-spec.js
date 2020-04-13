const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Describe = require('../../mud/commands/describe-command')
const Room = require('../../mud/things/room')

describe("Describe", function() {

  beforeEach(function() {
    this.subject = new Describe()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.room = sinon.createStubInstance(Room)
      this.response = this.subject.execute("/describe room This room is big and ugly.", this.room)
    })

    it("redescribes the current room", function() {
      expect(this.room.desc).to.have.been.calledWith("This room is big and ugly.")
    })

    it("reports the redescription", function() {
      expect(this.response).to.equal("Room description updated.")
    })
  })
})
