const chai = require('chai')
const expect = chai.expect

const LookCommand = require('../src/look-command')

describe("LookCommand", function() {

  beforeEach(function() {
    this.room = { name: 'the room', desc: 'the description' }
    this.subject = new LookCommand(this.room)
  })

  it("describes the room", function() {
    expect(this.subject.execute()).to.eql(["", "[the room]: the description"])
  })

})
