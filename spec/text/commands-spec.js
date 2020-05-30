const TextController = require('../../mud/text/text-controller')
const Room = require('../../mud/things/rooms/room')

const CURRENT_ROOM_ID = 23
const CURRENT_ROOM_NAME = 'The Red Room'
const CURRENT_ROOM_DESCRIPTION = 'The Red Room is red.'

xdescribe("Commands", function() {

  beforeEach(function() {
    this.currentRoom = createStubRoom(CURRENT_ROOM_ID, CURRENT_ROOM_NAME, CURRENT_ROOM_DESCRIPTION)
    this.context = createStubContext(null, this.currentRoom)

    this.processor = new TextController()
  })

  describe("Teleport: /teleport 42", function() {
    beforeEach(async function() {
      this.returnedRoom = sinon.createStubInstance(Room)
      this.returnedRoom.name.returns('the room')
      this.context.dungeon.fetchRoom.returns(this.returnedRoom)

      this.response = await this.processor.processMessage(this.context, "/teleport 42")
    })

    it("fetches room 42", function() {
      expect(this.context.dungeon.fetchRoom).to.have.been.calledWith(42)
    })

    it("update the context with the new room", function() {
      expect(this.context.room).to.equal(this.returnedRoom)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal("Teleported to [the room].")
    })
  })

  let scenarios = [
    { commandName: "Say", 
      command: "the message",
      response: "You said: the message" },
    { commandName: "Emote",
      command: "/emote did a thing!",
      response: "Player did a thing!" },
    { commandName: "Error",
      command: "/foo is so wrong!",
      response: "Invalid command '/foo is so wrong!'" }
  ]

  scenarios.forEach(scenario => {
    let { commandName, command, response } = scenario

    describe(`${commandName}: ${command}`, function() {
      beforeEach(async function() {
        this.response = await this.processor.processMessage(this.context, command)
      })

      it("returns the expected response", function() {
        expect(this.response).to.equal(response)
      })
    })
  })
})
