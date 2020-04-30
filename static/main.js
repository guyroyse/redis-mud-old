document.addEventListener('DOMContentLoaded', () => {

  let input = document.querySelector('#text-input')
  let display = document.querySelector('#text-panel')

  let ws = new WebSocket('ws://localhost:8081/')

  const AUTH_TOKEN_KEY = "authToken"
  const AUTH_REQUEST = "identify"
  const AUTH_RESPONSE = "identity"

  let authToken = localStorage.getItem(AUTH_TOKEN_KEY) || "";

  class DisplayHelper {
    static echoCommand(command) {
      //old school way of doing this, but avoids html insertion
      let text = document.createTextNode(`>${command}`)
      let bold = document.createElement("b")
      bold.appendChild(text)
      let p = document.createElement("p")
      p.className = "echo-command"
      p.appendChild(bold)
      display.appendChild(p)
      display.scrollTop = display.scrollHeight
    }
  
    static echoText(text) {
      let textNode = document.createTextNode(text)
      let p = document.createElement("p")
      p.appendChild(textNode)
      display.appendChild(p)
      display.scrollTop = display.scrollHeight
    }
  }


  input.addEventListener('keydown', event => {

    if (event.key === "Enter") {
      let command = input.value

      DisplayHelper.echoCommand(input.value)

      if(command==='/id'){
        display.innerHTML += `<p>Your current id is '${authToken}'</p>`
        display.scrollTop = display.scrollHeight
      }else{
        let request=JSON.stringify({
          "auth": authToken,
          "message": input.value
        })
        ws.send(request)
      }
      input.value = ""
      return false
    }
  })

  ws.onopen = event => {

    ws.onmessage = event => {

      //message uses json, so parse it!
      let response = JSON.parse(event.data)

      //if there is a status on the response, we have special handling
      if(response.status!=null){
        switch(response.status){
          
          case AUTH_REQUEST:
            //the server doesn't know who we are, and demands our identity
            //so, we give it our auth token and await our iden
            ws.send(JSON.stringify({auth:authToken}))
            break;

          case AUTH_RESPONSE:
            //in response to our auth token, the server will tell us who we are
            //if our auth token was bogus, the server gives us a new auth token
            //which we then save off for next time
            authToken = response.auth
            localStorage.setItem(AUTH_TOKEN_KEY, authToken)

            //sufficiently legitimized by the server, we issue the hello command
            ws.send(JSON.stringify({auth:authToken,message:'/hello'}))
            break;
        }
      }

      //if the response has at least one message
      //we should add them to the display
      if(response.messages!=null && response.messages.length>0) {
        for(const message of response.messages) {
            DisplayHelper.echoText(message)
        }
      }
    }
  }
})
