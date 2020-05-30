const { Emote } = require('../../../mud/text/commands')

describe("Emote", function() {
  beforeEach(function() {
    this.context = createStubContext()
    this.subject = new Emote()
  })

  describe('/emote did a thing!', function() {
    beforeEach(async function() {
      this.response = await this.subject.execute(this.context, '/emote did a thing!')
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal("Player did a thing!")
    })
  })
})
