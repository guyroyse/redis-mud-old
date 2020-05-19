import PassiveView from './view.js'

document.addEventListener('DOMContentLoaded', () => {

  let view = new PassiveView()

  let ws = new WebSocket('ws://localhost:8081/')

  ws.onopen = event => {

    view.listenForInput(event => {

      if (event.key === "Enter") {

        let request = {
          command: view.fetchInput()
        }

        ws.send(JSON.stringify(request))

        view.clearInput()
        return false
      }

    })

    ws.onmessage = event => {
      let response = JSON.parse(event.data)
      if (response.messages) {
        response.messages.forEach(message => view.displayMessage(message))
      }
    }
  }
})

