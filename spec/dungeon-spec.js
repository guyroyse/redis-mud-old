const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)


const Dungeon = require('../src/dungeon')

describe("Dungeon", function() {

  beforeEach(function() {
    this.subject = new Dungeon()
    sinon.spy(this.subject.shim)
  })

  context("when opened", function() {

    beforeEach(function() {
      this.subject.open('dungeon')
    })

    afterEach(function() {
      this.subject.close()
    })

    it("opens the shim with the key", function() {
      expect(this.subject.shim.open).to.have.been.calledWith('dungeon')
    })

    context("when the hub is fetched or created", function() {

      beforeEach(function() {
        return this.subject.fetchOrCreateHub()
      })
  
      it("askes the graph for the hub", function() {
        expect(this.subject.shim.fetchSingleNode).to.have.been.calledWith(
          "MERGE (r:room { uuid: '00000000-0000-0000-0000-000000000000' }) ON CREATE SET r.name='The Hub', r.desc='Huge hub is huge' RETURN r",
          'r'
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
