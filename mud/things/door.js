class Door {

  constructor(dungeon, {id, name, description, from, to}) {
    this.dungeon = dungeon
    this._id = id
    this._name = name
    this._description = description
    this._from = from
    this._to = to
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

  from() {
    return this._from
  }

  to() {
    return this._to
  }

}

module.exports = Door
