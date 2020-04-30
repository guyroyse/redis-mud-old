const chai = require('chai')
let expect = chai.expect

const Motd = require('../mud/motd')

describe("Motd", function() {

  beforeEach(function() {
  })

  describe("#fetchMotd", function() {
    beforeEach(function() {
      this.result = Motd.fetchMotd()
    })

    it("returns the prompt", function() {
      expect(this.result[0]).to.have.equal("Welcome to RedisMUD!")
      expect(this.result[1]).to.not.be.equal("")
    })
  })
})
