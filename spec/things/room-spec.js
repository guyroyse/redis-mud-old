const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Room = require('../../mud/things/room')
const Dungeon = require('../../mud/things/dungeon')

describe("Room", function() {

  beforeEach(function() {
    this.dungeon = sinon.createStubInstance(Dungeon)
    this.subject = new Room(this.dungeon, { id: 42, name: 'name', description: 'description' })
  })

  it("has expected ID", function() {
    expect(this.subject.id()).to.equal(42)
  })

  it("has expected name", function() {
    expect(this.subject.name()).to.equal('name')
  })

  it("has expected description", function() {
    expect(this.subject.description()).to.equal('description')
  })

  context("when redescribed", function() {

    this.beforeEach(function() {
      this.subject.description('new description')
    })

    it("has the new description", function() {
      expect(this.subject.description()).to.equal('new description')
    })

    it("updates the room", function() {
      expect(this.dungeon.updateRoom).to.have.been.calledWith(42, 'name', 'new description')
    })

  })

  context("when renamed", function() {

    this.beforeEach(function() {
      this.subject.name('new name')
    })

    it("has the new name", function() {
      expect(this.subject.name()).to.equal('new name')
    })

    it("renames the room", function() {
      expect(this.dungeon.updateRoom).to.have.been.calledWith(42, 'new name', 'description')
    })

  })
})
