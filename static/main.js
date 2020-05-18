document.addEventListener('DOMContentLoaded', () => {

  let input = document.querySelector('#text-input')
  let display = document.querySelector('#text-panel')

  let ws = new WebSocket('ws://localhost:8081/')

  ws.onopen = event => {

    input.addEventListener('keydown', event => {

      if (event.key === "Enter") {

        let request = {
          command: input.value
        }

        ws.send(JSON.stringify(request))

        input.value = ""
        return false
      }

    })

    ws.onmessage = event => {

      let response = JSON.parse(event.data)

      if (response.messages) {
        let addendum = response.messages
          .map(message => `<p>${message}</p>`)
          .join('')

        display.innerHTML = `${display.innerHTML}${addendum}`
        display.scrollTop = display.scrollHeight
      }


    }

  }

})
