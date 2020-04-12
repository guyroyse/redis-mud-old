const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Mud = require('../../mud')
const Look = Mud.Commands.Look
const Room = Mud.Things.Room

describe("Look", function() {

  beforeEach(function() {
    let room = sinon.createStubInstance(Room)
    room.name.returns('the room')
    room.desc.returns('the description')

    this.subject = new Look(room)
  })

  context("when executed", function() {
    beforeEach(function() {
      this.response = this.subject.execute("/look")
    })

    it("describes the current room", function() {
      expect(this.response).to.equal("[the room]: the description")
    })
  })
})
