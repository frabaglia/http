const http = require('http')
const {
    client: repo,
    universal
} = require('./bin')

const {
    method,
    query,
    body
} = repo.getEnv(process.env.ENV)

universal.isValidHTTPMethod(method)

const url = `/${query}`
const opts = {
    url,
    port: 9000,
    host: 'localhost',
    method
}

const req = http.request(opts, res => {
    universal.collectDataFromStreamHandler(res, 'CLIENT')
})

req
    .on('response', req => console.log('> response >', {
        status: req.statusCode,
        statusMessage: req.statusMessage,
        headers: req.headers
    }))
    .on('error', error => console.log('> error >', error.message))

if (method !== 'GET' && method !== 'DELETE')
    req.write(body)

console.log('sending request', {
    ...opts
})

req.end()