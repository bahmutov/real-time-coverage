var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 3032 })
wss.on('connection', function connection (ws) {
  console.log('connection!')
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
  })
  // ws.send('something')
})
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data)
  })
}

setInterval(function () {
  const randomLine = parseInt(Math.random() * 20)
  console.log('sending random line', randomLine)
  wss.broadcast(JSON.stringify({line: randomLine}))
}, 1000)

console.log('running ws at port 3032')
