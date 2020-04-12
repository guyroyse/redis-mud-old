const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Rename = require('../../mud').Commands.Rename
const Room = require('../../mud').Room

xdescribe("Rename", function() {

  beforeEach(function() {
    this.room = sinon.createStubInstance(Room)
    this.stream = { send: sinon.spy() }

    this.subject = new Rename(this.room)
  })

  it("renames the current room", function() {
    this.subject.execute(this.stream, "/rename room The Fub")

    expect(this.room.name).to.have.been.calledWith("The Fub")

    expect(this.stream.send).to.have.been.calledTwice
    expect(this.stream.send.firstCall).to.have.been.calledWith("Room renamed.")
    expect(this.stream.send.lastCall).to.have.been.calledWith("")
  })

})
