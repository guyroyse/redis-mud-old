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
    beforeEach(async function() {
      Room.byId.resolves(this.aRoom)
    })

    context("when changing the name", function() {
      beforeEach(async function() {
        this.previousDescription = this.aRoom.description
        this.response = stripAnsi(await this.subject.execute(this.context,
          `/edit room ${this.aRoom.id} name=TheBlueRoom`))
      })

      it("updates the name of the room", function() {
        expect(this.aRoom.name).to.equal("TheBlueRoom")
      })

      it("does not update the description of the room", function() {
        expect(this.aRoom.description).to.equal(this.previousDescription)
      })
    })

    context("when changing the description", function() {
      beforeEach(async function() {
        this.previousName = this.aRoom.name
        this.response = stripAnsi(await this.subject.execute(this.context,
          `/edit room ${this.aRoom.id} description="The Blue Room Is Blue"`))
      })

      it("does not update the name of the room", function() {
        expect(this.aRoom.name).to.equal(this.previousName)
      })

      it("updates the description of the room", function() {
        expect(this.aRoom.description).to.equal("The Blue Room Is Blue")
      })
    })

    context("when changing all the properties", function() {
      
    })
  })
})