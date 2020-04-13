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
    this.subject = new Room(this.dungeon, { uuid: 'uuid', name: 'name', desc: 'desc' })
  })

  it("has expected UUID", function() {
    expect(this.subject.uuid()).to.equal('uuid')
  })

  it("has expected name", function() {
    expect(this.subject.name()).to.equal('name')
  })

  it("has expected description", function() {
    expect(this.subject.desc()).to.equal('desc')
  })

  context("when redescribed", function() {

    this.beforeEach(function() {
      this.subject.desc('new description')
    })

    it("has the new description", function() {
      expect(this.subject.desc()).to.equal('new description')
    })

    it("updates the room", function() {
      expect(this.dungeon.updateRoom).to.have.been.calledWith('uuid', 'name', 'new description')
    })

  })

})
