// https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html

class AnsiStringBuilder {
  constructor() {
    this._message = ""
  }

  text(s = '') {
    this._message += s
    return this
  }

  space(n = 1) {
    return this.text(new Array(n).fill(' ').join(''))
  }

  nl(n = 1) {
    return this.text(new Array(n).fill('\n').join(''))
  }

  black(s)                    { return this.addCode('\x1b[30m', s) }
  red(s)                      { return this.addCode('\x1b[31m', s) }
  green(s)                    { return this.addCode('\x1b[32m', s) }
  yellow(s)                   { return this.addCode('\x1b[33m', s) }
  blue(s)                     { return this.addCode('\x1b[34m', s) }
  magenta(s)                  { return this.addCode('\x1b[35m', s) }
  cyan(s)                     { return this.addCode('\x1b[36m', s) }
  white(s)                    { return this.addCode('\x1b[37m', s) }

  backgroundBlack(s)          { return this.addCode('\x1b[40m', s) }
  backgroundRed(s)            { return this.addCode('\x1b[41m', s) }
  backgroundGreen(s)          { return this.addCode('\x1b[42m', s) }
  backgroundYellow(s)         { return this.addCode('\x1b[43m', s) }
  backgroundBlue(s)           { return this.addCode('\x1b[44m', s) }
  backgroundMagenta(s)        { return this.addCode('\x1b[45m', s) }
  backgroundCyan(s)           { return this.addCode('\x1b[46m', s) }
  backgroundWhite(s)          { return this.addCode('\x1b[47m', s) }
  
  bright(s)                   { return this.addCode('\x1b[1m', s) }
  normal(s)                   { return this.addCode('\x1b[22m', s) }

  color(foreground, background, s) {
    return this.foregroundColor(foreground).backgroundColor(background).text(s)
  }

  foregroundColor(n, s) { return this.addCode(`\x1b[38;5;${n}m`, s) }
  backgroundColor(n, s) { return this.addCode(`\x1b[48;5;${n}m`, s) }

  reset() { return this.addCode('\x1b[0m') }

  addCode(code, s) { return this.text(code).text(s) }

  build() { return this._message }
}

module.exports = AnsiStringBuilder
