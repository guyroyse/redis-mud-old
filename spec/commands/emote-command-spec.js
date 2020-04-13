const chai = require('chai')
let expect = chai.expect

const Emote = require('../../mud/commands/emote-command')

describe("Emote", function() {

  beforeEach(function() {
    this.subject = new Emote()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.response = this.subject.execute("/emote did the thing.")
    })

    it("emotes the thing", function() {
      expect(this.response).to.equal("Player did the thing.")
    })
  })
})
