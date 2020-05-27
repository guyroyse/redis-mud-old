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

  black(s) { return this.addCode('\x1b[30m', s) }
  red(s) { return this.addCode('\x1b[31m', s) }
  green(s) { return this.addCode('\x1b[32m', s) }
  yellow(s) { return this.addCode('\x1b[33m', s) }
  blue(s) { return this.addCode('\x1b[34m', s) }
  magenta(s) { return this.addCode('\x1b[35m', s) }
  cyan(s) { return this.addCode('\x1b[36m', s) }
  white(s) { return this.addCode('\x1b[37m', s) }

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
