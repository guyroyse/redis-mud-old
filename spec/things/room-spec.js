const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Room = require('../../mud/things/room')
const Dungeon = require('../../mud/things/dungeon')
const Door = require('../../mud/things/door')

const ROOM_ID = 42



describe("Room", function() {

  beforeEach(function() {
    this.dungeon = sinon.createStubInstance(Dungeon)
    this.subject = new Room(this.dungeon, { id: ROOM_ID, name: 'name', description: 'description' })
  })

  it("has expected ID", function() {
    expect(this.subject.id()).to.equal(ROOM_ID)
  })

  it("has expected name", function() {
    expect(this.subject.name()).to.equal('name')
  })

  it("has expected description", function() {
    expect(this.subject.description()).to.equal('description')
  })

  context("when fetching doors", function() {
    beforeEach(async function() {
      this.doorA = new Door(this.dungeon, { id: 1, name: 'Alpha', description: 'A Door'})
      this.doorB = new Door(this.dungeon, { id: 2, name: 'Bravo', description: 'B Door'})
      this.doorC = new Door(this.dungeon, { id: 3, name: 'Charlie', description: 'C Door'})

      this.dungeon.fetchDoorsByRoom.resolves([ this.doorA, this.doorB, this.doorC ])
      this.doors = await this.subject.doors()
    })

    it("fetches the doors from the dungeon", function() {
      expect(this.dungeon.fetchDoorsByRoom).to.have.been.calledWith(42)
    })

    it("returns the expected doors", function() {
      expect(this.doors).to.have.lengthOf(3)
      expect(this.doors[0]).to.equal(this.doorA)
      expect(this.doors[1]).to.equal(this.doorB)
      expect(this.doors[2]).to.equal(this.doorC)
    })
  })

  context("when redescribed", function() {

    beforeEach(function() {
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

    beforeEach(function() {
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
