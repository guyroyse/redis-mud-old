const http = require('http')

const StaticServer = require('node-static').Server

let fileServer = new StaticServer('./static')
let httpServer = http.createServer((request, response) => {
  request
    .addListener('end', () => fileServer.serve(request, response))
    .resume()
})

httpServer.listen(8080)
