// https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html

class AnsiStringBuilder {
  constructor() {
    this._message = ""
  }

  text(s) {
    this._message += s
    return this
  }

  space(n = 1) {
    this._message += new Array(n).fill(' ').join('')
    return this
  }

  black(s)                    { return this.addCode('\x1b[30m', s) }
  red(s)                      { return this.addCode('\x1b[31m', s) }
  green(s)                    { return this.addCode('\x1b[32m', s) }
  yellow(s)                   { return this.addCode('\x1b[33m', s) }
  blue(s)                     { return this.addCode('\x1b[34m', s) }
  magenta(s)                  { return this.addCode('\x1b[35m', s) }
  cyan(s)                     { return this.addCode('\x1b[36m', s) }
  white(s)                    { return this.addCode('\x1b[37m', s) }

  brightBlack(s)              { return this.addCode('\x1b[30;1m', s)  }
  brightRed(s)                { return this.addCode('\x1b[31;1m', s)  }
  brightGreen(s)              { return this.addCode('\x1b[32;1m', s)  }
  brightYellow(s)             { return this.addCode('\x1b[33;1m', s)  }
  brightBlue(s)               { return this.addCode('\x1b[34;1m', s)  }
  brightMagenta(s)            { return this.addCode('\x1b[35;1m', s)  }
  brightCyan(s)               { return this.addCode('\x1b[36;1m', s)  }
  brightWhite(s)              { return this.addCode('\x1b[37;1m', s)  }

  color(n, s) { return this.addCode(`\x1b[38;5;${n}m`, s) }

  backgroundBlack(s)          { return this.addCode('\x1b[40m', s) }
  backgroundRed(s)            { return this.addCode('\x1b[41m', s) }
  backgroundGreen(s)          { return this.addCode('\x1b[42m', s) }
  backgroundYellow(s)         { return this.addCode('\x1b[43m', s) }
  backgroundBlue(s)           { return this.addCode('\x1b[44m', s) }
  backgroundMagenta(s)        { return this.addCode('\x1b[45m', s) }
  backgroundCyan(s)           { return this.addCode('\x1b[46m', s) }
  backgroundWhite(s)          { return this.addCode('\x1b[47m', s) }
  
  backgroundBrightBlack(s)    { return this.addCode('\x1b[40;1m', s) }
  backgroundBrightRed(s)      { return this.addCode('\x1b[41;1m', s) }
  backgroundBrightGreen(s)    { return this.addCode('\x1b[42;1m', s) }
  backgroundBrightYellow(s)   { return this.addCode('\x1b[43;1m', s) }
  backgroundBrightBlue(s)     { return this.addCode('\x1b[44;1m', s) }
  backgroundBrightMagenta(s)  { return this.addCode('\x1b[45;1m', s) }
  backgroundBrightCyan(s)     { return this.addCode('\x1b[46;1m', s) }
  backgroundBrightWhite(s)    { return this.addCode('\x1b[47;1m', s) }

  backgroundColor(n, s) { return this.addCode(`\x1b[48;5;${n}m`, s) }

  reset() { return this.addCode('\x1b[0m') }

  addCode(code, s) {
    this._message += code
    if (s) this._message += s
    return this
  }

  build() {
    return this._message
  }

}

module.exports = AnsiStringBuilder
