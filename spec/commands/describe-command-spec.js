const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Describe = require('../../mud').Commands.Describe
const Room = require('../../mud').Room

describe("Describe", function() {

  beforeEach(function() {
    this.room = sinon.createStubInstance(Room)
    this.stream = { send: sinon.spy() }

    this.subject = new Describe(this.room)
  })

  it("redescribes the current room", function() {
    this.subject.execute(this.stream, "/describe room This room is big and ugly.")

    expect(this.room.desc).to.have.been.calledWith("This room is big and ugly.")

    expect(this.stream.send).to.have.been.calledTwice
    expect(this.stream.send.firstCall).to.have.been.calledWith("Room description updated.")
    expect(this.stream.send.lastCall).to.have.been.calledWith("")
  })

})
