const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Emote = require('../../mud/commands/emote-command')
const Room = require('../../mud/things/room')

describe("Emote", function() {

  beforeEach(function() {
    this.subject = new Emote()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.room = sinon.createStubInstance(Room)
      this.response = this.subject.execute("/emote did the thing.", this.room)
    })

    it("emotes the thing", function() {
      expect(this.response).to.equal("Player did the thing.")
    })
  })
})
