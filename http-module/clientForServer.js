const http = require('http')

const options = {
    host: '127.0.0.1',
    port: 8000,
    path: '/',
    method: 'get'
}

function simpleDemo() {
    const client = http.request(options)

    client.on('error', (err) => {
        console.error(err)
    })

    client.setTimeout(5000, () => {
        console.log('client request is timeout')
    })

    client.on('finish', () => {
        console.log('the listener of finish are emited')
    })

    client.on('socket', (socket) => {
        console.log('the socket is created')
    })

    client.on('response', (res) => {
        console.log('the listener of response is emited')
        console.log('statusCode:', res.statusCode)
        console.log('headers from server', res.headers)
        res.on('data', (chunk) => {
            console.log('the message from server is:', chunk.toString())
        })
    })

    client.on('close', () => {
        console.log('the listenre of close were emited')
    })

    client.on('timeout', () => {
        console.log('the listener of timeout were emitted')
    })

    client.end('hello')
}

function ExpectContinueDemo() {
    const options = {
        host: '127.0.0.1',
        port: 8000,
        path: '/',
        method: 'get'
    }
    const client = http.request(options)
    client.setHeader('Expect', '100-continue')
    client.on('continue', () => {
        console.log('Receive 100-continue')
        client.write('this is the request body')
        client.end()
    })
    client.on('response', (res) => {
        console.log('client receive message from server')
        console.log('statusCode', res.statusCode)
    })
    client.write('Sending request headers')
    // client.end()
}

function ExpectOtherDemo() {
    const options = {
        host: '127.0.0.1',
        port: 8000,
        path: '/',
        method: 'get'
    }

    const client = http.request(options)
    client.setHeader('Expect', 'other')

    client.on('response', (resp) => {
        console.log('receive message from server')
        console.log('statusCode', resp.statusCode)
        resp.on('data', (chunk) => {
            console.log(chunk)
        })
    })

    client.end()
}


// 尝试触发dropRequest 未成功
let lastSocketId = null
/**
 * 同一个socket
 */
function dropRequest() {

    for (let i = 0; i < 10000; i++) {
        request(i)
    }

    function request(index) {
        const client = http.request(options)
        client.setSocketKeepAlive(true)
        client.on('error', (error) => {
            console.error(error)
        })
        client.on('close', () => {
            console.log('close listener was called')
        })
    
        client.on('socket', (socket) => {
            const newId = socket.remoteAddress + ':' + socket.remotePort + ':' + index
            if (!lastSocketId) {
                lastSocketId = newId
                socket.id = lastSocketId
            }
            if (lastSocketId === socket.id) {
                console.log('socket is the same')
            }
            console.log('socket is connected:', index)
        })

        client.on('response', (resp) => {
            console.log('receive message from server')
            console.log('statuscode:', resp.statusCode)
            resp.on('data', (chunk) => {
                console.log('the message from server:', chunk.toString())
            })
        })
        client.end()
    }
}

simpleDemo()
// dropRequest()
// ExpectOtherDemo()
// ExpectContinueDemo()