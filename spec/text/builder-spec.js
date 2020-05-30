const AnsiStringBuilder = require('../../mud/text/builder')

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

  it("builds a newline", function() {
    expect(this.subject.nl().build()).to.equal('\n')
  })

  it("builds multiple newline", function() {
    expect(this.subject.nl(4).build()).to.equal('\n\n\n\n')
  })

  let codeScenarios = [
    { code: '\x1b[30m', func: 'black' },
    { code: '\x1b[31m', func: 'red' },
    { code: '\x1b[32m', func: 'green' },
    { code: '\x1b[33m', func: 'yellow' },
    { code: '\x1b[34m', func: 'blue' },
    { code: '\x1b[35m', func: 'magenta' },
    { code: '\x1b[36m', func: 'cyan' },
    { code: '\x1b[37m', func: 'white' },
    { code: '\x1b[40m', func: 'backgroundBlack' },
    { code: '\x1b[41m', func: 'backgroundRed' },
    { code: '\x1b[42m', func: 'backgroundGreen' },
    { code: '\x1b[43m', func: 'backgroundYellow' },
    { code: '\x1b[44m', func: 'backgroundBlue' },
    { code: '\x1b[45m', func: 'backgroundMagenta' },
    { code: '\x1b[46m', func: 'backgroundCyan' },
    { code: '\x1b[47m', func: 'backgroundWhite' },
    { code: '\x1b[1m',  func: 'bright' },
    { code: '\x1b[22m', func: 'normal' }
  ]

  codeScenarios.forEach(scenario => {

    let { func, code } = scenario

    it("builds ansi colors", function() {
      expect(this.subject[func]().build()).to.equal(code)
    })

    it("builds ansi colors with text", function() {
      expect(this.subject[func]('foo').build()).to.equal(`${code}foo`)
    })
  
  })

  it("builds a foreground color by number", function() {
    expect(this.subject.foregroundColor(5).build()).to.equal(`\x1b[38;5;5m`)
  })

  it("builds a foreground color by number with text", function() {
    expect(this.subject.foregroundColor(10, 'foo').build()).to.equal(`\x1b[38;5;10mfoo`)
  })

  it("builds a background color by number", function() {
    expect(this.subject.backgroundColor(15).build()).to.equal(`\x1b[48;5;15m`)
  })

  it("builds a background color by number with text", function() {
    expect(this.subject.backgroundColor(20, 'foo').build()).to.equal(`\x1b[48;5;20mfoo`)
  })

  it("builds a color by numbers", function() {
    expect(this.subject.color(25, 30).build()).to.equal(`\x1b[38;5;25m\x1b[48;5;30m`)
  })

  it("builds a color by numbers with text", function() {
    expect(this.subject.color(35, 40, 'foo').build()).to.equal(`\x1b[38;5;35m\x1b[48;5;40mfoo`)
  })

  it("builds an ansi reset", function() {
    it("builds ansi colors", function() {
      expect(this.subject.reset.build()).to.equal('\x1b[0m')
    })
  })

  it("chains calls", function() {
    expect(this.subject.text('foo').space(4).red('bar').build()).to.equal('foo    \x1b[31mbar')
  })  

})
