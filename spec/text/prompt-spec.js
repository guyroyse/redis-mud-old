const Prompt = require('../../mud/text/prompt')

describe("Prompt", function() {
  beforeEach(function() {
    this.subject = new Prompt()
  })

  describe("#fetchPrompt", function() {
    beforeEach(function() {
      let currentRoom = createCurrentRoom()
      let context = createStubContext(null, currentRoom)
      
      this.result = this.subject.fetchPrompt(context)
    })

    it("returns the prompt", function() {
      expect(stripAnsi(this.result)).to.equal(`You are in ${CURRENT_ROOM_NAME} [${CURRENT_ROOM_ID}]`)
    })
  })
})
