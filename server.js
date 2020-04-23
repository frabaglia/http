const http = require('http')
const server = http.createServer()
const URL = require('url')
const {server: repo, universal} = require('./utils')

const response = true ? 'hello world' : '{"txt":"hello world"}'
const requestHandler = (req, res) => {
    universal.isValidHTTPMethod(req.method)
    universal.collectDataFromStreamHandler(req, 'SERVER')

    repo.requestLogger(req, res)
    repo.response(req, res, response)
}

server
.on('request', requestHandler)
.listen(9000)

// switch (req.method) {
//     case "GET":const 
//         res.write('you did a get')
//         break;
//     case "POST":
//         res.write('you did a post')
//         break;
//     case "PATCH":
//         res.write('you did a patch')
//         break;
//     case "PUT":
//         res.write('you did a put')
//         break;
//     case "DELETE":
//         res.write('you did a delete')
//         break;
//     default:
//         return res.write('you did something else')
//         break;
// }