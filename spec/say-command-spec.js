const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)


const SayCommand = require('../redis-mud/say-command')

describe("SayCommand", function() {

  beforeEach(function() {
    this.stream = { send: sinon.spy() }

    this.subject = new SayCommand("the message")
  })

  it("says the thing", function() {
    this.subject.execute(this.stream)

    expect(this.stream.send).to.have.been.calledTwice
    expect(this.stream.send.firstCall).to.have.been.calledWith("You said: the message")
    expect(this.stream.send.lastCall).to.have.been.calledWith("")
  })

})
