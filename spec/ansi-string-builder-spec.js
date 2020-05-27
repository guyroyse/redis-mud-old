const chai = require('chai')
let expect = chai.expect

const AnsiStringBuilder = require('../mud/ansi-string-builder')

describe("AnsiStringBuilder", function() {

  beforeEach(function() {
    this.subject = new AnsiStringBuilder()
  })

  it("builds and empty string", function() {
    expect(this.subject.build()).to.be.empty
  })

  it("builds simple text", function() {
    expect(this.subject.text('foo').build()).to.equal('foo')
  })

  it("builds a space", function() {
    expect(this.subject.space().build()).to.equal(' ')
  })

  it("builds multiple spaces", function() {
    expect(this.subject.space(4).build()).to.equal('    ')
  })

  let colorScenarios = [
    { color: 'black', code: '\x1b[30m' },
    { color: 'red', code: '\x1b[31m' },
    { color: 'green', code: '\x1b[32m' },
    { color: 'yellow', code: '\x1b[33m' },
    { color: 'blue', code: '\x1b[34m' },
    { color: 'magenta', code: '\x1b[35m' },
    { color: 'cyan', code: '\x1b[36m' },
    { color: 'white', code: '\x1b[37m' }
  ]

  colorScenarios.forEach(scenario => {

    let {color, code} = scenario

    it("builds ansi colors", function() {
      expect(this.subject[color]().build()).to.equal(code)
    })

    it("builds ansi colors with text", function() {
      expect(this.subject[color]('foo').build()).to.equal(`${code}foo`)
    })
  
  })

  it("builds an ansi reset", function() {
    it("builds ansi colors", function() {
      expect(this.subject.reset.build()).to.equal('\x1b[0m')
    })
  })

  it("chains calls", function() {
    expect(this.subject.text('foo').text('bar').build()).to.equal('foobar')
  })  

})
