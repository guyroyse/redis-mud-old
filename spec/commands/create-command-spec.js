const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Create = require('../../mud/commands/create-command')
const Dungeon = require('../../mud/things/dungeon')

xdescribe("Create", function() {

  beforeEach(function() {
    this.subject = new Create()
  })

  context("when executed", function() {
    beforeEach(function() {
      this.response = this.subject.execute("/create room The Blue Room")
    })

    it("reports the creation", function() {
      expect(this.response).to.equal("Room created with ID: foobar")
    })
  })
})
