const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)


const LookCommand = require('../src/look-command')
const Room = require('../src/room')

describe("LookCommand", function() {

  beforeEach(function() {
    let room = sinon.createStubInstance(Room)
    room.name.returns('the room')
    room.desc.returns('the description')

    this.stream = { send: sinon.spy() }

    this.subject = new LookCommand(room)
  })

  it("describes the current room", function() {
    this.subject.execute('/look', this.stream)

    expect(this.stream.send).to.have.been.calledTwice
    expect(this.stream.send.firstCall).to.have.been.calledWith("")
    expect(this.stream.send.lastCall).to.have.been.calledWith("[the room]: the description")
  })

})
