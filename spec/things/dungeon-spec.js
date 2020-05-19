const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Dungeon = require('../../mud/things/dungeon')
const RedisShim = require('../../mud/data/redis-shim')
const Queries = require('../../mud/data/queries')

describe("Dungeon", function() {

  beforeEach(function() {
    sinon.stub(RedisShim.prototype, 'open')
    sinon.stub(RedisShim.prototype, 'close')
    sinon.stub(RedisShim.prototype, 'execute')
    sinon.stub(RedisShim.prototype, 'executeAndReturnSingle')
    sinon.stub(RedisShim.prototype, 'executeAndReturnMany')

    this.subject = new Dungeon()
  })

  afterEach(function () {
    sinon.restore()
  })

  context("when opened", function() {

    beforeEach(function() {
      this.subject.open('dungeon')
    })

    it("opens the shim with the key", function() {
      expect(RedisShim.prototype.open).to.have.been.calledWith('dungeon')
    })

    describe("#fetchRoom", function() {
      beforeEach(async function() {
        RedisShim.prototype.executeAndReturnSingle
          .returns([ 42, 'the name', 'the description' ])
        this.result = await this.subject.fetchRoom(42)
      })

      it("askes the graph for the room", function() {
        expect(RedisShim.prototype.executeAndReturnSingle)
          .to.have.been.calledWith(Queries.FETCH_ROOM, { id: 42 })
      })

      it("returns a room with expected properties", function() {
        expect(this.result.id()).to.equal(42)
        expect(this.result.name()).to.equal('the name')
        expect(this.result.description()).to.equal('the description')
      })

    })

    describe("#fetchOrCreateHub", function() {

      beforeEach(async function() {
        RedisShim.prototype.executeAndReturnSingle
          .returns([ 42, 'the name', 'the description' ])
        this.result = await this.subject.fetchOrCreateHub()
      })
  
      it("askes the graph for the hub", function() {
        expect(RedisShim.prototype.executeAndReturnSingle)
          .to.have.been.calledWith(Queries.FETCH_OR_CREATE_HUB,
            { name: 'The Hub', description: 'Huge hub is huge' })
      })

      it("returns a room with expected properties", function() {
        expect(this.result.id()).to.equal(42)
        expect(this.result.name()).to.equal('the name')
        expect(this.result.description()).to.equal('the description')
      })
  
    })

    describe("#createRoom", function() {

      beforeEach(async function() {
        RedisShim.prototype.executeAndReturnSingle
          .returns([ 42, 'the name', 'the description' ])
        this.result = await this.subject.createRoom("The Blue Room")
      })

      it("creates the room", function() {
        expect(RedisShim.prototype.executeAndReturnSingle)
          .to.have.been.calledWith(Queries.CREATE_ROOM, { name: 'The Blue Room', description: 'This is a room.' })
      })

      it("returns a room with expected properties", function() {
        expect(this.result.id()).to.equal(42)
        expect(this.result.name()).to.equal('the name')
        expect(this.result.description()).to.equal('the description')
      })
    })

    describe("#createDoor", function() {
      beforeEach(async function() {
        RedisShim.prototype.executeAndReturnSingle
          .returns([ 23, 'the name', 'the description', 13, 42 ])
        this.result = await this.subject.createDoor({ name: "The Red Door", from: 13, to: 42 })
      })

      it("create the door", function() {
        expect(RedisShim.prototype.executeAndReturnSingle)
          .to.have.been.calledWith(Queries.CREATE_DOOR, 
            { name: 'The Red Door', description: 'This is a door.', from: 13, to: 42 })
      })

      it("returns a door with expected properties", function() {
        expect(this.result.id()).to.equal(23)
        expect(this.result.name()).to.equal('the name')
        expect(this.result.description()).to.equal('the description')
        expect(this.result.from()).to.equal(13)
        expect(this.result.to()).to.equal(42)
      })
    })

    describe("#updateRoom", function() {
      beforeEach(async function() {
        await this.subject.updateRoom(42, 'new name', 'new description')
      })

      it("updates the room", function() {
        expect(RedisShim.prototype.execute)
          .to.have.been.calledWith(Queries.UPDATE_ROOM,
            { id: 42, name: 'new name', description: 'new description'})
      })
    })

    describe("#fetchRoomList", function() {
      beforeEach(async function() {
        RedisShim.prototype.executeAndReturnMany.returns([
          [ 23, 'the room', 'desc 1' ],
          [ 42, 'the other room', 'desc 2' ],
          [ 13, 'the back room', 'desc 3' ]
        ])

        this.rooms = await this.subject.fetchRoomList()
      })

      it("fetches the rooms", function() {
        expect(RedisShim.prototype.executeAndReturnMany)
          .to.have.been.calledWith(Queries.FETCH_ALL_ROOMS)
      })

      it("returns all the rooms", function() {
        expect(this.rooms).to.have.lengthOf(3)

        expect(this.rooms[0].id()).to.equal(23)
        expect(this.rooms[0].name()).to.equal('the room')
        expect(this.rooms[0].description()).to.equal('desc 1')

        expect(this.rooms[1].id()).to.equal(42)
        expect(this.rooms[1].name()).to.equal('the other room')
        expect(this.rooms[1].description()).to.equal('desc 2')

        expect(this.rooms[2].id()).to.equal(13)
        expect(this.rooms[2].name()).to.equal('the back room')
        expect(this.rooms[2].description()).to.equal('desc 3')
      })
    })

    context("when the dungeon is closed", function() {
      beforeEach(function() {
        this.subject.close()
      })
  
      it("closes the shim", function() {
        expect(RedisShim.prototype.close).to.have.been.called
      })
    })

  })
})
