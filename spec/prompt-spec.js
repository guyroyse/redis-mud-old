const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Prompt = require('../mud/prompt')
const Room = require('../mud/things/room')

describe("Prompt", function() {

  beforeEach(function() {
    this.subject = new Prompt()
  })

  describe("#fetchPrompt", function() {
    beforeEach(function() {
      this.room = sinon.createStubInstance(Room)
      this.room.name.returns('some room')

      this.context = { room: this.room }

      this.result = this.subject.fetchPrompt(this.context)
    })

    it("returns the prompt", function() {
      expect(this.result).to.have.ordered.members(["You are in [some room]"])
    })
  })
})
