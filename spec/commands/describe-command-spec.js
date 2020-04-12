const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Mud = require('../../mud')
const Describe = Mud.Commands.Describe
const Room = Mud.Things.Room

describe("Describe", function() {

  beforeEach(function() {
    this.room = sinon.createStubInstance(Room)
    this.subject = new Describe(this.room)
  })

  context("when executed", function() {
    beforeEach(function() {
      this.response = this.subject.execute("/describe room This room is big and ugly.")
    })

    it("redescribes the current room", function() {
      expect(this.room.desc).to.have.been.calledWith("This room is big and ugly.")
    })

    it("reports the redescription", function() {
      expect(this.response).to.equal("Room description updated.")
    })
  })
})
