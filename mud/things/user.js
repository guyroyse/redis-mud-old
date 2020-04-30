class User {

    constructor(dungeon, {id, name}) {
      this.dungeon = dungeon
      this._id = id
      this._name = name
    }
  
    id() {
      return this._id
    }

    name(name) {
      if(name){
        this._name = name
        //TODO: persist name
      }
      return this._name
    }

    static fromValues(values) {
      if(values!=null){
        return new User(this, {
          id: values[0],
          name: values[1]
        })
      } else {
        return null
      }
    }
  
}
  
module.exports = User
  