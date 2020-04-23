const http = require('http')
const server = http.createServer()
const {
    server: repo,
    universal
} = require('./bin')

const body = true ? 'hello world' : '{"txt":"hello world"}'
const requestHandler = (req, res) => {
    universal.isValidHTTPMethod(req.method)
    universal.collectDataFromStreamHandler(req, 'SERVER')

    repo.requestLogger(req, res)
    repo.response(req, res, body)
}

server
    .on('request', requestHandler)
    .listen(9000)