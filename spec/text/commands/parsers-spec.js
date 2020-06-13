const Parsers = require('../../../mud/text/commands/parsers')
const { expect } = require('chai')

describe("Parsers", function() {
  describe("#parseSlashCommand", function() {
    it("extracts a slash command", function() {
      expect(Parsers.slashCommand("/foo")).to.equal('foo')
    })

    it("extracts a slash command with trailing text", function() {
      expect(Parsers.slashCommand("/foo bar baz")).to.equal('foo')
    })

    it("extracts a slash command with extra whitespace", function() {
      expect(Parsers.slashCommand("/foo \t bar baz")).to.equal('foo')
    })
  })

  describe("#parseSubcommand", function() {
    it("extracts an empty string when there is no subcommand", function() {
      expect(Parsers.subcommand("/foo")).to.equal('')
    })

    it("extracts a lonely subcommand", function() {
      expect(Parsers.subcommand("/foo bar")).to.equal('bar')
    })

    it("extracts a subcommand with trailing text", function() {
      expect(Parsers.subcommand("/foo bar baz qux")).to.equal('bar')
    })

    it("extracts a subcommand with extra whitespace", function() {
      expect(Parsers.subcommand("/foo \t bar \t baz qux")).to.equal('bar')
    })
  })

  describe("#parseArgs", function() {
    it("extracts an empty string when there are no arguments", function() {
      expect(Parsers.args("/foo bar")).to.equal('')
    })

    it("extracts an single argument", function() {
      expect(Parsers.args("/foo bar baz")).to.equal('baz')
    })

    it("extracts multiple arguments", function() {
      expect(Parsers.args("/foo bar baz qux")).to.equal('baz qux')
    })

    it("extracts arguments with extra whitespace", function() {
      expect(Parsers.args("/foo \t bar \t baz qux")).to.equal('baz qux')
    })
  })

  describe("#parseId", function() {
    it("extracts null when there is no id", function() {
      expect(Parsers.id("")).to.be.null
    })

    it("returns the default value when there is no id", function() {
      expect(Parsers.id("", 13)).to.equal(13)
    })

    it("extracts the id", function() {
      expect(Parsers.id("23")).to.equal(23)
    })

    it("extracts the id with a default value", function() {
      expect(Parsers.id("23", 42)).to.equal(23)
    })

    it("extracts the id with trailing text", function() {
      expect(Parsers.id("42 bar baz qux")).to.equal(42)
    })

    it("extracts the id with trailing text and a default value", function() {
      expect(Parsers.id("42 bar baz qux", 23)).to.equal(42)
    })

    it("extracts the id with extra whitespace", function() {
      expect(Parsers.id("42 \t bar \t baz \t qux")).to.equal(42)
    })

    it("extracts the id with extra whitespace and a default value", function() {
      expect(Parsers.id("42 \t bar \t baz \t qux", 13)).to.equal(42)
    })
  })

  describe("#parseName", function() {
    it("extracts null when there is no name", function() {
      expect(Parsers.name("")).to.be.null
    })

    it("returns the default value when there is no name", function() {
      expect(Parsers.name("", "Alice")).to.equal("Alice")
    })

    it("extracts the name", function() {
      expect(Parsers.name("Bob")).to.equal("Bob")
    })

    it("extracts the name with a default value", function() {
      expect(Parsers.name("Bob", "Alice")).to.equal("Bob")
    })

    it("extracts the name with trailing text", function() {
      expect(Parsers.name("Bob bar baz qux")).to.equal("Bob")
    })

    it("extracts the name with trailing text and a default value", function() {
      expect(Parsers.name("Bob bar baz qux", "Alice")).to.equal("Bob")
    })

    it("extracts the name with extra whitespace", function() {
      expect(Parsers.name("Bob \t bar \t baz \t qux")).to.equal("Bob")
    })

    it("extracts the name with extra whitespace and a default value", function() {
      expect(Parsers.name("Bob \t bar \t baz \t qux", "Alice")).to.equal("Bob")
    })

    it("extracts null when there are quotes but no name", function() {
      expect(Parsers.name('""')).to.be.null
    })

    it("returns the default value when there are quotes but no name", function() {
      expect(Parsers.name('""', "Alice")).to.equal("Alice")
    })

    it("extracts the name when there are quotes", function() {
      expect(Parsers.name('"Bob the Barbarian"')).to.equal("Bob the Barbarian")
    })

    it("extracts the name with a default value when there are quotes", function() {
      expect(Parsers.name('"Bob the Barbarian"', "Alice")).to.equal("Bob the Barbarian")
    })

    it("extracts the name with trailing text when there are quotes", function() {
      expect(Parsers.name('"Bob the Barbarian" bar baz qux')).to.equal("Bob the Barbarian")
    })

    it("extracts the name with trailing text and a default value when there are quotes", function() {
      expect(Parsers.name('"Bob the Barbarian" bar baz qux', "Alice")).to.equal("Bob the Barbarian")
    })

    it("extracts the name with extra whitespace when there are quotes", function() {
      expect(Parsers.name('"Bob the Barbarian" \t bar \t baz \t qux')).to.equal("Bob the Barbarian")
    })

    it("extracts the name with extra whitespace and a default value when there are quotes", function() {
      expect(Parsers.name('"Bob the Barbarian" \t bar \t baz \t qux', "Alice")).to.equal("Bob the Barbarian")
    })
  })

  describe("#parseIdList", function() {
    it("extracts empty array when args is empty", function() {
      expect(Parsers.idList("foo", "")).to.have.members([])
    })

    it("extracts empty array when args has only an id", function() {
      expect(Parsers.idList("foo", "12")).to.have.members([])
    })

    it("extracts empty array when args has only a name", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian"')).to.have.members([])
    })

    it("extracts empty array when args is missing the key", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian" bar=13,23,42')).to.have.members([])
    })

    it("extracts an array when key contains a single id", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian" foo=13')).to.have.members([13])
    })

    it("extracts an array when key contains multiple ids", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian" foo=13,23,42')).to.have.ordered.members([13,23,42])
    })

    it("extracts an array when key contains a single id and other keys", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian" foo=13 bar=13,23,42')).to.have.members([13])
    })

    it("extracts an array when key contains multiple ids and other keys", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian" foo=13,23,42 bar=13,23,42')).to.have.ordered.members([13,23,42])
    })

    it("extracts an array when key contains multiple ids, other keys, and extra whitespace", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian" \t foo=13,23,42 \t bar=13,23,42')).to.have.ordered.members([13,23,42])
    })

    it("extracts default value array when args is empty", function() {
      expect(Parsers.idList("foo", "", [1,2,3])).to.have.members([1,2,3])
    })

    it("extracts default value when args has only an id", function() {
      expect(Parsers.idList("foo", "12", [1,2,3])).to.have.members([1,2,3])
    })

    it("extracts default value when args has only a name", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian"', [1,2,3])).to.have.members([1,2,3])
    })

    it("extracts default value when args is missing the key", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian" bar=13,23,42', [1,2,3])).to.have.members([1,2,3])
    })

    it("extracts an array when key contains a single id and a default value", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian" foo=13', [1,2,3])).to.have.members([13])
    })

    it("extracts an array when key contains multiple ids and a default value", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian" foo=13,23,42', [1,2,3])).to.have.ordered.members([13,23,42])
    })

    it("extracts an array when key contains a single id, other keys, and a default value", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian" foo=13 bar=13,23,42', [1,2,3])).to.have.members([13])
    })

    it("extracts an array when key contains multiple ids, other keys, and a default value", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian" foo=13,23,42 bar=13,23,42', [1,2,3])).to.have.ordered.members([13,23,42])
    })

    it("extracts an array when key contains multiple ids, other keys, extra whitespace, and a default value", function() {
      expect(Parsers.idList("foo", '"Bob the Barbarian" \t foo=13,23,42 \t bar=13,23,42', [1,2,3])).to.have.ordered.members([13,23,42])
    })
  })

  describe("#parseStringValue", function() {
    it("extracts null when args is empty", function() {
      expect(Parsers.stringValue("foo", "")).to.be.null
    })

    it("extracts null when args has only an id", function() {
      expect(Parsers.stringValue("foo", "12")).to.be.null
    })

    it("extracts null when args has only a name", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian"')).to.be.null
    })

    it("extracts null when args is missing the key", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" baz=qux')).to.be.null
    })

    it("extracts value from a key", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" foo=bar')).to.equal('bar')
    })

    it("extracts value with quotes from a key", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" foo="bar baz qux"')).to.equal('bar baz qux')
    })

    it("extracts value from a key when args contains other keys", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" foo=bar baz=qux')).to.equal('bar')
    })

    it("extracts value with quotes from a key when args contains other keys", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" foo="bar baz qux" baz=qux')).to.equal('bar baz qux')
    })

    it("extracts value with quotes from a key when args contains other keys with quotes", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" foo="bar baz qux" baz="qux quux quuux"')).to.equal('bar baz qux')
    })

    it("extracts value with quotes from a key when args contains other keys with quotes and extra whitespace", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" \t foo="bar baz qux" \t baz="qux quux quuux"')).to.equal('bar baz qux')
    })

    it("extracts default value when args is empty", function() {
      expect(Parsers.stringValue("foo", "", "bar")).to.equal("bar")
    })

    it("extracts default value when args has only an id", function() {
      expect(Parsers.stringValue("foo", "12", "bar")).to.equal("bar")
    })

    it("extracts default value when args has only a name", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian"', "bar")).to.equal("bar")
    })

    it("extracts default value when args is missing the key", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" baz=qux', "bar")).to.equal("bar")
    })

    it("extracts value from a key with default value", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" foo=bar', "baz")).to.equal('bar')
    })

    it("extracts value with quotes from a key and default value", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" foo="bar baz qux"', "baz")).to.equal('bar baz qux')
    })

    it("extracts value from a key when args contains other keys and default value", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" foo=bar baz=qux', "baz")).to.equal('bar')
    })

    it("extracts value with quotes from a key when args contains other keys and default value", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" foo="bar baz qux" baz=qux', "baz")).to.equal('bar baz qux')
    })

    it("extracts value with quotes from a key when args contains other keys with quotes and default value", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" foo="bar baz qux" baz="qux quux quuux"', "baz")).to.equal('bar baz qux')
    })

    it("extracts value with quotes from a key when args contains other keys with quotes, extra whitespace, and default value", function() {
      expect(Parsers.stringValue("foo", '"Bob the Barbarian" \t foo="bar baz qux" \t baz="qux quux quuux"', "baz")).to.equal('bar baz qux')
    })
  })
})
