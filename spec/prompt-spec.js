const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Prompt = require('../mud/prompt')
const Room = require('../mud/things/room')

const AnsiStringBuilder = require('../mud/ansi-string-builder')

describe("Prompt", function() {

  beforeEach(function() {
    this.subject = new Prompt()
  })

  describe("#fetchPrompt", function() {
    beforeEach(function() {
      this.room = sinon.createStubInstance(Room)
      this.room.name.returns('some room')
      this.room.id.returns(23)

      this.context = { room: this.room }

      this.result = this.subject.fetchPrompt(this.context)
    })

    it("returns the prompt", function() {
      let expected = new AnsiStringBuilder().yellow('You are in ').magenta('some room [23]').reset().build()
      expect(this.result).to.equal(expected)
    })
  })
})
