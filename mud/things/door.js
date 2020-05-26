class Door {

  constructor(dungeon, {id, name, description}) {
    this.dungeon = dungeon
    this._id = id
    this._name = name
    this._description = description
  }

  id() {
    return this._id
  }

  name() {
    return this._name
  }

  description() {
    return this._description
  }

}

module.exports = Door
