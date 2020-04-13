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
    sinon.stub(RedisGraphShim.prototype, 'updateNode')

    this.subject = new Dungeon()
  })

  afterEach(function () {
    RedisGraphShim.prototype.open.restore()
    RedisGraphShim.prototype.close.restore()
    RedisGraphShim.prototype.fetchSingleNode.restore()
    RedisGraphShim.prototype.updateNode.restore()
  })

  context("when opened", function() {

    beforeEach(function() {
      this.subject.open('dungeon')
    })

    it("opens the shim with the key", function() {
      expect(RedisGraphShim.prototype.open).to.have.been.calledWith('dungeon')
    })

    context("when the hub is fetched or created", function() {

      beforeEach(async function() {
        RedisGraphShim.prototype.fetchSingleNode.returns({
          uuid: 'the uuid',
          name: 'the name',
          desc: 'the description'
        })
        this.result = await this.subject.fetchOrCreateHub()
      })
  
      it("askes the graph for the hub", function() {
        expect(RedisGraphShim.prototype.fetchSingleNode).to.have.been.calledWith(
          "MERGE (r:room { uuid: '00000000-0000-0000-0000-000000000000' }) ON CREATE SET r.name = 'The Hub', r.desc = 'Huge hub is huge' RETURN r",
          'r'
        )
      })

      it("returns a room with expected properties", function() {
        expect(this.result.uuid()).to.equal('the uuid')
        expect(this.result.name()).to.equal('the name')
        expect(this.result.desc()).to.equal('the description')
      })
  
    })

    context("when a room is updated", function() {

      beforeEach(function() {
        return this.subject.updateRoom('uuid', 'new name', 'new description')
      })

      it("updates the room", function() {
        expect(RedisGraphShim.prototype.updateNode).to.have.been.calledWith(
          "MERGE (r:room { uuid: 'uuid' }) ON MATCH SET r.name = 'new name', r.desc = 'new description'"
        )
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
