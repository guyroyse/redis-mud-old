const chai = require('chai')
let expect = chai.expect

const Say = require('../../mud/commands/say-command')

describe("Say", function() {

  beforeEach(function() {
    this.subject = new Say()
  })

  it("says the thing", function() {
    let result = this.subject.execute("the message")
    expect(result).to.equal("You said: the message")
  })

})
