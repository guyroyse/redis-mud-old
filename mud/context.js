const Dungeon = require('./things/dungeon')

class Context {

  async spawnPlayer(user){
    if(user!=null && this.players[user.id()]==null){
      this.players[user.id()]={
        room: await this.dungeon.fetchOrCreateHub()
      }
    }
  }

  async authenticate(authToken){
    let userId = Number(authToken)
    if(!isNaN(userId) && userId!=0){
      let user = await this.dungeon.fetchUser(userId)
      this.spawnPlayer(user)
      return user
    }
    return null
  }
  async createPlayer(){
    let user = await this.dungeon.createUser()
    this.spawnPlayer(user)
    return user
  }

  async start() {
    this.dungeon = new Dungeon()
    this.dungeon.open('dungeon')
    this.players = {}
  }

}

module.exports = Context
