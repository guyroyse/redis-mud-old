const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Mud = require('../../mud')
const Error = Mud.Commands.Error

describe("Error", function() {

  beforeEach(function() {
    this.stream = { send: sinon.spy() }

    this.subject = new Error()
  })

  it("emotes the thing", function() {
    this.subject.execute(this.stream, "/foo is so wrong")

    expect(this.stream.send).to.have.been.calledTwice
    expect(this.stream.send.firstCall).to.have.been.calledWith("Invalid command '/foo is so wrong'")
    expect(this.stream.send.lastCall).to.have.been.calledWith("")
  })

})
