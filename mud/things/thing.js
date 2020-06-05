class Thing {
  constructor(dungeon, map) {
    this.dungeon = dungeon
    this.map = map
  }

  static proxy(dungeon, map) {
    let thing = new this(dungeon, map)

    return new Proxy(thing, {
      get: function(thing, name) {
        if (Reflect.has(thing, name)) {
          return thing[name]
        }
        return thing.map.get(name)
      },
      set: function(thing, name, value) {
        if (name !== 'id') {
          thing.map.set(name, value)
          thing.update()
          return true
        }
        return false
      }
    })
  }
}

module.exports = Thing
