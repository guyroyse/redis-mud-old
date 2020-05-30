const Prompt = require('../../mud/text/prompt')
const Room = require('../../mud/things/rooms/room')
const Context = require('../../mud/context')

describe("Prompt", function() {

  beforeEach(function() {
    this.subject = new Prompt()
  })

  describe("#fetchPrompt", function() {
    beforeEach(function() {
      let context = sinon.createStubInstance(Context)
      let room = sinon.createStubInstance(Room)

      sinon.stub(context, 'room').get(() => room)
      sinon.stub(room, 'id').get(() => 23)
      sinon.stub(room, 'name').get(() => 'some room')

      this.result = this.subject.fetchPrompt(context)
    })

    it("returns the prompt", function() {
      expect(stripAnsi(this.result)).to.equal('You are in some room [23]')
    })
  })
})
