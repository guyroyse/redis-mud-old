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

  describe("Room", function() {
    beforeEach(async function() {
      Room.byId.resolves(this.aRoom)
      this.previousName = this.aRoom.name
      this.previousDescription = this.aRoom.description
    })

    context("when changing the name", function() {
      beforeEach(async function() {
        this.response = stripAnsi(await this.subject.execute(this.context,
          `/edit room ${this.aRoom.id} name="The Blue Room"`))
      })

      it("updates the name of the room", function() {
        expect(this.aRoom.name).to.equal("The Blue Room")
      })

      it("does not update the description of the room", function() {
        expect(this.aRoom.description).to.equal(this.previousDescription)
      })
    })

    context("when changing the description", function() {
      beforeEach(async function() {
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
      beforeEach(async function() {
        this.response = stripAnsi(await this.subject.execute(this.context,
          `/edit room ${this.aRoom.id} name="The Blue Room" description="The Blue Room Is Blue"`))
      })

      it("updates the name of the room", function() {
        expect(this.aRoom.name).to.equal("The Blue Room")
      })

      it("updates the description of the room", function() {
        expect(this.aRoom.description).to.equal("The Blue Room Is Blue")
      })

      it("returns the expected response", function() {
        expect(this.response).to.equal(`Updated room with ID of ${this.aRoom.id}.`)
      })
    })

    context("when changing the current room", function() {
      beforeEach(async function() {
        Room.byId.resolves(this.currentRoom)
        this.response = stripAnsi(await this.subject.execute(this.context,
          `/edit room ${this.currentRoom.id} name="The New Room" description="The New Room Is New"`))
      })

      it("updates the current room", function() {
        expect(this.context.room).to.equal(this.currentRoom)
      })
    })

    context("when change a room other than the current room", function() {
      beforeEach(async function() {
        this.response = stripAnsi(await this.subject.execute(this.context,
          `/edit room ${this.aRoom.id} name="The Blue Room" description="The Blue Room Is Blue"`))
      })

      it("updates the current room", function() {
        expect(this.context.room).to.not.equal(this.aRoom)
      })
    })
  })
})