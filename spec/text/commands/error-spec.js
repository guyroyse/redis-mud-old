const { Error } = require('../../../mud/text/commands')

describe("Error", function() {
  beforeEach(function() {
    this.context = createStubContext()
    this.subject = new Error()
  })

  describe("/foo is so wrong!", function() {
    beforeEach(async function() {
      this.subject = new Error()
      this.response = stripAnsi(await this.subject.execute(this.context, '/foo is so wrong!'))
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal("Ye can't get ye flask! INVALID COMMAND '/foo is so wrong!'")
    })
  })
})
