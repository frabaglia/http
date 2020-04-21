const http = require('http')
const server = http.createServer()
const URL = require('url')

server.on('request', requestHandler)

server.listen(9000)

function requestHandler(req, res) {
    const url = URL.parse(req.url)

    console.log({
        timestamp: Date.now(), 
        headers: req.headers, 
        method: req.method, 
        url: req.url,
        path: url.path,
        query: url.query,
        path: url.path
    })

    if (url.path === '/api') {
        res.setHeaders('Content-Type', 'application/json')
        res.write("{ body: 'you did a get', status: 200}")
    }
    
    res.write('hi young padowan...')
    switch (req.method) {
        case "GET":
            res.write('you did a get')
            break;
        case "POST":
            res.write('you did a post')
            break;
        case "PATCH":
            res.write('you did a patch')
            break;
        case "PUT":
            res.write('you did a put')
            break;
        case "DELETE":
            res.write('you did a delete')
            break;
        default:
            return res.write('you did something else')
            break;
    }

    req.setEncoding('utf8')

    req.on('data', chunk => {
        console.log('receiving chunks from client', chunk)
    })

    res.end('for now i finished with you...'); 
}