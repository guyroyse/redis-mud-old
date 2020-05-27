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
    { code: '\x1b[30m', color: 'black' },
    { code: '\x1b[31m', color: 'red' },
    { code: '\x1b[32m', color: 'green' },
    { code: '\x1b[33m', color: 'yellow' },
    { code: '\x1b[34m', color: 'blue' },
    { code: '\x1b[35m', color: 'magenta' },
    { code: '\x1b[36m', color: 'cyan' },
    { code: '\x1b[37m', color: 'white' },
    { code: '\x1b[30;1m', color: 'brightBlack' },
    { code: '\x1b[31;1m', color: 'brightRed' },
    { code: '\x1b[32;1m', color: 'brightGreen' },
    { code: '\x1b[33;1m', color: 'brightYellow' },
    { code: '\x1b[34;1m', color: 'brightBlue' },
    { code: '\x1b[35;1m', color: 'brightMagenta' },
    { code: '\x1b[36;1m', color: 'brightCyan' },
    { code: '\x1b[37;1m', color: 'brightWhite' },
    { code: '\x1b[40m',   color: 'backgroundBlack' },
    { code: '\x1b[41m',   color: 'backgroundRed' },
    { code: '\x1b[42m',   color: 'backgroundGreen' },
    { code: '\x1b[43m',   color: 'backgroundYellow' },
    { code: '\x1b[44m',   color: 'backgroundBlue' },
    { code: '\x1b[45m',   color: 'backgroundMagenta' },
    { code: '\x1b[46m',   color: 'backgroundCyan' },
    { code: '\x1b[47m',   color: 'backgroundWhite' },
    { code: '\x1b[40;1m', color: 'backgroundBrightBlack' },
    { code: '\x1b[41;1m', color: 'backgroundBrightRed' },
    { code: '\x1b[42;1m', color: 'backgroundBrightGreen' },
    { code: '\x1b[43;1m', color: 'backgroundBrightYellow' },
    { code: '\x1b[44;1m', color: 'backgroundBrightBlue' },
    { code: '\x1b[45;1m', color: 'backgroundBrightMagenta' },
    { code: '\x1b[46;1m', color: 'backgroundBrightCyan' },
    { code: '\x1b[47;1m', color: 'backgroundBrightWhite' }
  ]

  colorScenarios.forEach(scenario => {

    let { color, code } = scenario

    it("builds ansi colors", function() {
      expect(this.subject[color]().build()).to.equal(code)
    })

    it("builds ansi colors with text", function() {
      expect(this.subject[color]('foo').build()).to.equal(`${code}foo`)
    })
  
  })

  for (let i = 0; i < 256; i++) {
    it("builds a color by number", function() {
      expect(this.subject.color(i).build()).to.equal(`\x1b[38;5;${i}m`)
    })

    it("builds a color by number with text", function() {
      expect(this.subject.color(i, 'foo').build()).to.equal(`\x1b[38;5;${i}mfoo`)
    })

    it("builds a background color by number", function() {
      expect(this.subject.backgroundColor(i).build()).to.equal(`\x1b[48;5;${i}m`)
    })

    it("builds a background color by number with text", function() {
      expect(this.subject.backgroundColor(i, 'foo').build()).to.equal(`\x1b[48;5;${i}mfoo`)
    })
  }

  it("builds an ansi reset", function() {
    it("builds ansi colors", function() {
      expect(this.subject.reset.build()).to.equal('\x1b[0m')
    })
  })

  it("chains calls", function() {
    expect(this.subject.text('foo').text('bar').build()).to.equal('foobar')
  })  

})
