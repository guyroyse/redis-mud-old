const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)


const Dungeon = require('../mud').Dungeon

describe("Dungeon", function() {

  beforeEach(function() {
    this.subject = new Dungeon()
    sinon.stub(this.subject.shim)
  })

  context("when opened", function() {

    beforeEach(function() {
      this.subject.open('dungeon')
    })

    it("opens the shim with the key", function() {
      expect(this.subject.shim.open).to.have.been.calledWith('dungeon')
    })

    context("when the hub is fetched or created", function() {

      beforeEach(async function() {
        this.subject.shim.fetchSingleNode.returns({
          uuid: 'the uuid',
          name: 'the name',
          desc: 'the description'
        })
        this.result = await this.subject.fetchOrCreateHub()
      })
  
      it("askes the graph for the hub", function() {
        expect(this.subject.shim.fetchSingleNode).to.have.been.calledWith(
          "MERGE (r:room { uuid: '00000000-0000-0000-0000-000000000000' }) ON CREATE SET r.name='The Hub', r.desc='Huge hub is huge' RETURN r",
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
        expect(this.subject.shim.updateNode).to.have.been.calledWith(
          "MERGE (r:room { uuid: 'uuid', name: 'new name', desc: 'new description' })"
        )
      })

    })

    context("when the dungeon is closed", function() {

      beforeEach(function() {
        this.subject.close()
      })
  
      it("closes the shim", function() {
        expect(this.subject.shim.close).to.have.been.called
      })

    })

  })
})
