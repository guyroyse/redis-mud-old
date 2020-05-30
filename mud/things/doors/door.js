class Door {

  constructor(dungeon, {id, name, description}) {
    this._dungeon = dungeon
    this._id = id
    this._name = name
    this._description = description
  }

  get id() { return this._id }

  get name() { return this._name }
  set name(name) {
    this._name = name
    this.update()
  }

  get description() { return this._description }
  set description(description) {
    this._description = description
    this.update()
  }

}

module.exports = Door
