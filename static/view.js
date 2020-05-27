const ansi_up = new AnsiUp()

class PassiveView {
  constructor() {
    this.display = document.querySelector('#text-panel')
    this.input = document.querySelector('#text-input')
  }

  displayMessage(message) {
    let p = document.createElement('p')
    p.innerHTML = ansi_up.ansi_to_html(message)
    this.display.appendChild(p)
    this.display.scrollTop = this.display.scrollHeight
  }

  listenForInput(callback) {
    this.input.addEventListener('keydown', event => callback(event))
  }

  fetchInput() {
    return this.input.value
  }

  clearInput() {
    this.input.value = ''
  }
}

export default PassiveView
