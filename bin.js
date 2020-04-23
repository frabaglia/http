const onData = object => chunk => {
    console.log('> data > spoling chunk to local memory: ', chunk)
    object.data += chunk
}
const onEnd = object => () => console.log('> end > the concatened result of all chunks is: ', object.data)
const onError = error => console.log('> error >', error.message)

const collectDataFromStreamHandler = (stream = null, name = 'DEFAULT') => {

    let object = {
        data: ''
    }

    try {
        stream
            .setEncoding('utf8')
            .on('data', onData(object))
            .on('end', onEnd(object))
            .on('error', onError)
    } catch (error) {
        console.log('error:', error.message)
        throw new Error('invalid stream received')
    }

    return stream
}

const isValidHTTPMethod = method => {
    if (method === 'GET' ||
        method === 'POST' ||
        method === 'PUT' ||
        method === 'DELETE' ||
        method === 'PATCH') return
    throw new Error('invalid http method')
}

const getEnv = env => {
    const method =
        typeof process.env.METHOD === 'string' ?
        process.env.METHOD : 'GET'

    const query =
        typeof process.env.QUERY === 'string' ?
        process.env.QUERY : ''

    const keepAlive =
        typeof process.env.KA === 'string' ?
        true : false

    const keepAliveMsecs =
        typeof process.env.KA === 'string' ?
        Number.parseInt(process.env.KA) : 0

    const body =
        typeof process.env.BODY === 'string' ?
        Number.parseInt(process.env.BODY) : ''

    return {
        method,
        query,
        keepAlive,
        keepAliveMsecs,
        body
    }
}

const response = (req, res, msg = '') => {
    let contentType = 'text/plain'
    try {
        JSON.parse(msg)
        contentType = 'application/json'
    } catch (error) {

    }

    res.writeHead(200, {
        'Content-Type': contentType
    });
    res.write(msg)
    res.end()
}

const requestLogger = (req, res) => {
    console.log('requesting from', req.url)
    console.log(`method`, req.method)
}

module.exports = {
    server: {
        response,
        requestLogger
    },
    universal: {
        collectDataFromStreamHandler,
        isValidHTTPMethod
    },
    client: {
        getEnv
    }
}