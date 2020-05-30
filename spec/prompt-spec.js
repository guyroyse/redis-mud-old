const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Prompt = require('../mud/prompt')
const Room = require('../mud/things/rooms/room')
const Context = require('../mud/context')

const AnsiStringBuilder = require('../mud/ansi-string-builder')

describe("Prompt", function() {

  beforeEach(function() {
    this.subject = new Prompt()
  })

  describe("#fetchPrompt", function() {
    beforeEach(function() {
      this.context = sinon.createStubInstance(Context)
      this.room = sinon.createStubInstance(Room)

      sinon.stub(this.context, 'room').get(() => this.room)
      sinon.stub(this.room, 'id').get(() => 23)
      sinon.stub(this.room, 'name').get(() => 'some room')

      this.result = this.subject.fetchPrompt(this.context)
    })

    it("returns the prompt", function() {
      let expected = new AnsiStringBuilder().yellow('You are in ').magenta('some room [23]').reset().build()
      expect(this.result).to.equal(expected)
    })
  })
})
