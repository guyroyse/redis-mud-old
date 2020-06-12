const { Edit } = require('../../../mud/text/commands/edit')
const { Room } = require('../../../mud/things/things')
const { expect } = require('chai')

describe("Edit", function() {
  beforeEach(function() {
    sinon.stub(Room, 'byId')

    this.aRoom = createARoom()

    this.currentRoom = createCurrentRoom()
    this.context = createStubContext(this.currentRoom)

    this.subject = new Edit()
  })

  describe("/edit room", function() {
    context("when changing the name", function() {
      beforeEach(async function() {
        Room.byId.resolves(this.aRoom)
        this.response = stripAnsi(await this.subject.execute(this.context,
          `/edit room ${this.aRoom.id} name=TheBlueRoom`))
      })

      it("updates the name of the room", function() {
        expect(this.aRoom.name).to.equal("TheBlueRoom")
      })
    })

    context("when changing the description", function() {
      
    })

    context("when changing all the properties", function() {
      
    })
  })
})