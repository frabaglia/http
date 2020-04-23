const http = require('http')
const {client: repo, universal} = require('./utils')

const {
    method,
    query,
    keepAlive,
    keepAliveMsecs
} = repo.getEnv(process.env.ENV)

universal.isValidHTTPMethod(method)

const agent = keepAlive ? new http.Agent({ keepAlive, keepAliveMsecs }) : undefined
const url = `/${query}`
const opts = {
    url,
    port: 9000,
    host: 'localhost',
    method,
    agent
}

const req = http.request(opts, res => universal.collectDataFromStreamHandler(res, 'CLIENT'))

req
.on('response', req => console.log('> response >', {
    status: req.statusCode,
    statusMessage: req.statusMessage,
    headers: req.headers
}))
.on('error', error => console.log('> error >', error.message))

if (process.env.METHOD !== 'GET' && 
    process.env.METHOD !== 'DELETE' &&
    typeof process.env.BODY === 'string')
    req.write(process.env.BODY)

console.log('Starting request', {...opts})
req.end()