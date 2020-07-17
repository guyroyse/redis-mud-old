import PassiveView from './view.js'

const AUTH_TOKEN_KEY = 'authToken'

document.addEventListener('DOMContentLoaded', () => {

  let view = new PassiveView()

  let ws = new WebSocket('ws://localhost:8081/')

  ws.onopen = event => {

    let token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      let request = { type: 'validation', token }
      ws.send(JSON.stringify(request))  
    } else {
      view.hideLoading()
      view.displayLogin()
    }

    view.listenForLogin(event => {
      let request = {
        type: 'login',
        username: view.username(),
        password: view.password()
      }

      ws.send(JSON.stringify(request))
    })

    view.listenForInput(event => {

      if (event.key === "Enter") {

        let request = {
          type: 'command',
          command: view.fetchInput()
        }

        ws.send(JSON.stringify(request))

        view.clearInput()
        return false
      }

    })

    const handlerTable = {
      message: handleMessage,
      validation: handleValidation,
      login: handleLogin,
    }

    ws.onmessage = event => {
      let response = JSON.parse(event.data)
      let handler = handlerTable[response.type]
      if (handler) handler(response)
    }

    function handleMessage(response) {
      if (response.messages) {
        response.messages.forEach(message => view.displayMessage(message))
      }
    }

    function handleValidation(response) {
      view.hideLoading()
      if (response.valid) {
        view.displayGame()
      } else {
        view.displayLogin()
      }
    }

    function handleLogin(response) {
      if (response.valid) {
        localStorage.setItem(AUTH_TOKEN_KEY, response.token)
        view.hideLogin()
        view.displayGame()
      } else {
        // display login error
      }
    }
  }
})

