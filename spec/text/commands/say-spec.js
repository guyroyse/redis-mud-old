const { Say } = require('../../../mud/text/commands')

describe("Say", function() {
  beforeEach(function() {
    this.context = createStubContext()
    this.subject = new Say()
  })

  describe('the message', function() {
    beforeEach(async function() {
      this.response = await this.subject.execute(this.context, 'the message')
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal("You said: the message")
    })
  })
})
