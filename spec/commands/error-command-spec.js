const chai = require('chai')
let expect = chai.expect

const Mud = require('../../mud')
const Error = Mud.Commands.Error

describe("Error", function() {

  beforeEach(function() {
    this.subject = new Error()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.response = this.subject.execute("/foo is so wrong")
    })

    it("displays the error message", function() {
      expect(this.response).to.equal("Invalid command '/foo is so wrong'")
    })
  })
})
