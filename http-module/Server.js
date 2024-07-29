const http = require('http')

function checkDemo() {
    const server = http.createServer()
    server.listen(8000)

    server.on('checkContinue', (req, res) => {
        console.log('checkContinue')
        res.writeHead(100)
        res.writeContinue()
        res.end('本次服务结束')
    })

    server.on('checkExpectation', (req, res) => {
        console.log('checkExpectation')
    })

    server.on('connection', (stream) => {
        console.log('listener connection')
    })

    server.on('error', (error) => {
        console.error(error)
    })

    server.on('clientError', (err, socket) => {
        console.error(error)
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    })

    // request用于监听客户端的请求，在createServer函数中的回调函数，其实就是自动监听了request函数
    server.on('request', (req, res) => {
        console.log('request')
        // res.writeHead(200)
        res.end('from server')
    })
}

function listenerDemo() {
    const server = http.createServer()

    server.on('connection', (socket) => {
        console.log('新的TCP已建立')
    })

    server.on('error', (err) => {
        console.error(err)
    })
    // 当socket上的请求超过server.maxRequestsPerSocket时，会触发此事件
    // 服务器会丢弃掉新的请求，然后发送503给客户端
    server.on('dropRequest', (req, socket) => {
        console.log('drop request')
    })

    server.listen(8000)

    server.on('request', (req, res) => {
        res.writeHead(200)
        res.end('send message from server')
    })
}

/**
 * 1：服务器不再接受新链接
 * 2：关闭掉已建立链接，但是未正在发送请求的链接
 * 
 * closeAllConnections:关闭掉所有链接，包括正在发送请求的连接，但是之后能接受新连接
 * closeIdleConnections: 关闭掉已建立连接，但是未正在发送请求的连接
 * 
 * 在使用后两个方法时，需要先调用close，避免发生竞争条件
 */
function closeServer() {
    const server = http.createServer({keepAliveTimeout: 60000}, (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json'})
        res.end('send message from server')
    })
    server.listen(8000)

    setTimeout(() => {
        server.close((err) => {
            if (err) {
                console.error(err)
                return
            }
            console.log('server is closed by .close()')
        })
    }, 20000)
}

function trailersDemo() {
    const server = http.createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Trailer': 'Content-MD5'
        })

        res.write('this is the response body. \n')
        res.write('it is being sent in chunks.\n')

        res.addTrailers({
            'Content-MD5': 'd41d8cd98f00b204e9800998ecf8427e'
        })

        res.end()
    })

    server.listen(8000, () => {
        console.log('Server listening on port 8000')
    })
}

trailersDemo()
// closeServer()
// listenerDemo()
// checkDemo()