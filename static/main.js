document.addEventListener('DOMContentLoaded', () => {

  let input = document.querySelector('#text-input')
  let display = document.querySelector('#text-panel')

  let ws = new WebSocket('ws://localhost:8081/')

  ws.onopen = event => {

    input.addEventListener('keydown', event => {

      if (event.key === "Enter") {
        display.innerHTML = `${display.innerHTML}<p class="callback"><b>&gt;${input.value}</b></p>`
        ws.send(input.value)
        input.value = ""
        return false
      }

    })

    ws.onmessage = event => {
      display.innerHTML = `${display.innerHTML}<p>${event.data}</p>`
      display.scrollTop = display.scrollHeight
    }

  }

})
