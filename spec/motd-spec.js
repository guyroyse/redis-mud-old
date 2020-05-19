const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Motd = require('../mud/motd')

describe("Motd", function() {

  beforeEach(function() {
    sinon.stub(Math, 'random')
    this.subject = new Motd()
  })

  afterEach(function() {
    sinon.restore()
  })

  describe("#fetchMotd", function() {

    let scenarios = [
      "Beware. You are likely to be eaten by a grue.",
      "You can't get ye flask!",
      "I used to be an adventurer like you, then I took and arrow in the knee.",
      "I'll be here all week! Try the veal!",
      "You smell a wumpus."
    ]

    scenarios.forEach((message, index) => {
      it("returns the motd", function() {
        Math.random.returns(index / scenarios.length)
        this.result = this.subject.fetchMotd()
        expect(this.result).to.have.equal(`Welcome to RedisMUD!\n${message}`)
      })
    })
  })
})
