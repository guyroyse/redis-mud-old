const Dungeon = require('./things/dungeon')

class Context {

  async authenticate(authToken){
    let userId = Number(authToken)
    if(!isNaN(userId) && userId!=0){
      return await this.dungeon.fetchUser(userId)
    }
    return null
  }
  async createPlayer(){
    let user = await this.dungeon.createUser()
    this.players[user.id()]={
      room: await this.dungeon.fetchOrCreateHub()
    }
    return user
  }

  async start() {
    this.dungeon = new Dungeon()
    this.dungeon.open('dungeon')
    this.players = {}
    this.room = await this.dungeon.fetchOrCreateHub()
  }

}

module.exports = Context
