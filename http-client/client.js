const http = require('http')

const isValidHTTPMethod = method => {
    if (method === 'GET' || 
        method === 'POST' || 
        method === 'PUT' || 
        method === 'DELETE' ||
        method === 'PATCH') return
    throw new Error('invalid http method')
}

const method = 
        typeof process.env.METHOD === 'string' ? 
        process.env.METHOD : 'GET'

isValidHTTPMethod(method)

const query =
        typeof process.env.QUERY === 'string' ? 
        process.env.QUERY : '?'

const url = '/'.concat(query)

const opts = {
    url,
    port: 9000,
    host: 'localhost',
    method
}

const req = http.request(opts, res => {
    res.setEncoding('utf8')
    res.on('data', chunk => console.log('receiving chunks from server ', chunk))
    res.on('error', error => console.log('receving error event from response connection ', error.message))  
})

req.on('error', error => console.log('receving error event from request connection ', error.message))

if (process.env.METHOD !== 'GET' && 
    process.env.METHOD !== 'DELETE' &&
    typeof process.env.BODY === 'string')
    req.write(process.env.BODY)

console.log({...opts})
req.end()