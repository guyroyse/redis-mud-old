const Dungeon = require('./things/dungeon')

class Context {

  async authenticate(authToken){
    let userId = Number(authToken)
    if(!isNaN(userId) && userId!=0){
      let user = await this.dungeon.fetchUser(userId)
      return user
    }
    return null
  }
  async createPlayer(){
    let user = await this.dungeon.createUser("Somebody _else_ named 'Guy'")
    let hub = await this.dungeon.fetchOrCreateHub();
    await this.dungeon.placeUserInRoom(user.id(),hub.id())
    return user
  }

  async start() {
    this.dungeon = new Dungeon()
    this.dungeon.open('dungeon')
  }

}

module.exports = Context
