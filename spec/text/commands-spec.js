const { Say, Emote, Error } = require('../../mud/text/commands')

describe("Commands", function() {

  beforeEach(function() {
    this.context = createStubContext()
  })

  let scenarios = [
    { clazz: Say,   command: "the message",         response: "You said: the message" },
    { clazz: Emote, command: "/emote did a thing!", response: "Player did a thing!" },
    { clazz: Error, command: "/foo is so wrong!",   response: "Invalid command '/foo is so wrong!'" }
  ]

  scenarios.forEach(scenario => {
    let { command, clazz, response } = scenario

    describe(`${command}`, function() {
      beforeEach(async function() {
        this.subject = new clazz()
        this.response = await this.subject.execute(this.context, command)
      })

      it("returns the expected response", function() {
        expect(this.response).to.equal(response)
      })
    })
  })
})
