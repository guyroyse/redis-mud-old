const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)


const Emote = require('../../mud').Commands.Emote

describe("Emote", function() {

  beforeEach(function() {
    this.stream = { send: sinon.spy() }

    this.subject = new Emote("did the thing.")
  })

  it("emotes the thing", function() {
    this.subject.execute(this.stream)

    expect(this.stream.send).to.have.been.calledTwice
    expect(this.stream.send.firstCall).to.have.been.calledWith("You did the thing.")
    expect(this.stream.send.lastCall).to.have.been.calledWith("")
  })

})
