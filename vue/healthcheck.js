const http = require('http')

const port = process.env.PORT || 4000

const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.setHeader('Content-Type', 'text/plain')
  res.end('Vite working!')
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

const options = {
  port,
  host: '0.0.0.0',
  timeout: 2000,
}

const request = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`)
  if (res.statusCode == 200) {
    process.exit(0)
  } else {
    process.exit(1)
  }
})

request.on('error', function () {
  console.log('ERROR')
  process.exit(1)
})

request.end()
