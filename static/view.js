const ansi_up = new AnsiUp()

class PassiveView {
  constructor() {
    this.displayPanel = document.querySelector('#text-panel')
    this.input = document.querySelector('#text-input')

    this.usernameInput = document.querySelector('#username-input')
    this.passwordInput = document.querySelector('#password-input')
    this.loginButton = document.querySelector('#login-button')
  }

  displayMessage(message) {
    let p = document.createElement('p')
    p.innerHTML = ansi_up.ansi_to_html(message)
    this.displayPanel.appendChild(p)
    this.displayPanel.scrollTop = this.displayPanel.scrollHeight
  }

  listenForLogin(callback) {
    this.loginButton.addEventListener('click', event => callback(event))
  }

  listenForInput(callback) {
    this.input.addEventListener('keydown', event => callback(event))
  }

  username() {
    return this.usernameInput.value
  }

  password() {
    return this.passwordInput.value
  }

  fetchInput() {
    return this.input.value
  }

  clearInput() {
    this.input.value = ''
  }

  hideLoading() { this.hide('loading') }
  hideLogin() { this.hide('login') }
  hideRegister() { this.hide('register') }
  hideGame() { this.hide('game') }

  displayLoading() { this.display('loading') }
  displayLogin() { this.display('login') }
  displayRegister() { this.display('register') }
  displayGame() { 
    console.log(this.display)
    this.display('game')
  }

  hide(id) {
    let section = document.querySelector(`section#${id}`)
    section.classList.add('hidden')
  }

  display(id) {
    let section = document.querySelector(`section#${id}`)
    section.classList.remove('hidden')
  }
}

export default PassiveView
