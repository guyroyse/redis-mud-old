const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Dungeon = require('../../mud/things/dungeon')
const RedisGraphShim = require('../../mud/data/redis-graph-shim')

describe("Dungeon", function() {

  beforeEach(function() {
    sinon.stub(RedisGraphShim.prototype, 'open')
    sinon.stub(RedisGraphShim.prototype, 'close')
    sinon.stub(RedisGraphShim.prototype, 'fetchSingleNode')
    sinon.stub(RedisGraphShim.prototype, 'fetchNodes')
    sinon.stub(RedisGraphShim.prototype, 'updateNode')
    sinon.stub(RedisGraphShim.prototype, 'executeQueryAndReturnValue')

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
      expect(RedisGraphShim.prototype.open).to.have.been.calledWith('dungeon')
    })

    describe("#fetchOrCreateHub", function() {

      beforeEach(async function() {
        RedisGraphShim.prototype.fetchSingleNode.returns({
          uuid: 'the uuid',
          name: 'the name',
          desc: 'the description'
        })
        this.result = await this.subject.fetchOrCreateHub()
      })
  
      it("askes the graph for the hub", function() {
        expect(RedisGraphShim.prototype.fetchSingleNode)
          .to.have.been.calledWithMatch(sinon.match.string)
      })

      it("returns a room with expected properties", function() {
        expect(this.result.uuid()).to.equal('the uuid')
        expect(this.result.name()).to.equal('the name')
        expect(this.result.desc()).to.equal('the description')
      })
  
    })

    describe("#createRoom", function() {

      beforeEach(async function() {
        RedisGraphShim.prototype.executeQueryAndReturnValue.returns(42)
        this.result = await this.subject.createRoom("The Blue Room")
      })

      it("creates the room", function() {
        expect(RedisGraphShim.prototype.executeQueryAndReturnValue)
          .to.have.been.calledWithMatch(sinon.match.string)
      })

      it("returns the room id", function() {
        expect(this.result).to.equal(42)
      })
    })

    describe("#updateRoom", function() {
      beforeEach(async function() {
        await this.subject.updateRoom('uuid', 'new name', 'new description')
      })

      it("updates the room", function() {
        expect(RedisGraphShim.prototype.updateNode)
          .to.have.been.calledWithMatch(sinon.match.string)
      })
    })

    describe("#fetchRoomList", function() {
      beforeEach(async function() {
        RedisGraphShim.prototype.fetchNodes.returns([
          { uuid: '23', name: 'the room', desc: 'desc 1' },
          { uuid: '42', name: 'the other room', desc: 'desc 2' },
          { uuid: '13', name: 'the back room', desc: 'desc 3' }
        ])

        this.rooms = await this.subject.fetchRoomList()
      })

      it("fetches the rooms", function() {
        expect(RedisGraphShim.prototype.fetchNodes)
          .to.have.been.calledWithMatch(sinon.match.string)
      })

      it("returns all the rooms", function() {
        expect(this.rooms).to.have.lengthOf(3)
        expect(this.rooms[0].uuid()).to.equal('23')
        expect(this.rooms[0].name()).to.equal('the room')
        expect(this.rooms[0].desc()).to.equal('desc 1')
        expect(this.rooms[1].uuid()).to.equal('42')
        expect(this.rooms[1].name()).to.equal('the other room')
        expect(this.rooms[1].desc()).to.equal('desc 2')
        expect(this.rooms[2].uuid()).to.equal('13')
        expect(this.rooms[2].name()).to.equal('the back room')
        expect(this.rooms[2].desc()).to.equal('desc 3')
      })
    })

    context("when the dungeon is closed", function() {
      beforeEach(function() {
        this.subject.close()
      })
  
      it("closes the shim", function() {
        expect(RedisGraphShim.prototype.close).to.have.been.called
      })
    })

  })
})
