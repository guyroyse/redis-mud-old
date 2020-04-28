document.addEventListener('DOMContentLoaded', () => {

  let input = document.querySelector('#text-input')
  let display = document.querySelector('#text-panel')

  let ws = new WebSocket('ws://localhost:8081/')

  const AUTH_TOKEN_KEY = "authToken"
  const AUTH_REQUEST = "authRequest"
  const AUTH_RESPONSE = "newauth"

  let authToken = localStorage.getItem(AUTH_TOKEN_KEY) || "";

  ws.onopen = event => {

    input.addEventListener('keydown', event => {

      if (event.key === "Enter") {
        display.innerHTML += `<p class="callback"><b>&gt;${input.value}</b></p>`
        let request=JSON.stringify({
          "auth": authToken,
          "message": input.value
        })
        ws.send(request)
        input.value = ""
        return false
      }

    })

    ws.onmessage = event => {
      let response = JSON.parse(event.data)

      if(response.status!=null){
        switch(response.status){
          case AUTH_REQUEST:
            console.log(authToken)
            ws.send(JSON.stringify({auth:authToken}))
            break;
          case AUTH_RESPONSE:
            authToken = response.auth
            console.log(authToken)
            localStorage.setItem(AUTH_TOKEN_KEY, authToken)
            ws.send(JSON.stringify({auth:authToken,message:'/hello'}))
            break;
        }
      }

      if(response.messages!=null && response.messages.length>0) {
        for(let index in response.messages) {
            let message = response.messages[index]
            display.innerHTML += `<p>${message}</p>`
        }
        display.scrollTop = display.scrollHeight
      }
    }
  }

})
