const http = require('http')

const StaticServer = require('node-static').Server

function start(port = 8080) {

  let staticServer = new StaticServer('./static')

  http.createServer((request, response) => {
    request
      .addListener('end', () => staticServer.serve(request, response))
      .resume()
  }).listen(port)

}

module.exports = { start }