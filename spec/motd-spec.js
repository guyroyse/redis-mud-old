const chai = require('chai')
let expect = chai.expect

const Motd = require('../mud/motd')

describe("Motd", function() {

  beforeEach(function() {
    this.subject = new Motd()
  })

  describe("#fetchMotd", function() {
    beforeEach(function() {
      this.result = this.subject.fetchMotd()
    })

    it("returns the prompt", function() {
      expect(this.result).to.have.ordered.members([
        "Welcome to RedisMUD!",
        "Beware. You are likely to be eaten by a grue."])
    })
  })
})
