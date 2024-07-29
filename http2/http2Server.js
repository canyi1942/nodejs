/**
 * 由于没有已知的浏览器支持未加密的http/2,所以和浏览器端通信时，不能使用createServer,
 * 必须使用createSecureServer
 */
const http2 = require('http2')

function simpleDemo() {
    const server = http2.createServer()
    server.listen(8000)

    // 当建立新的TCP连接时，触发此事件
    server.on('connection', (socket) => {
        console.log('the connection is emitted:',)
    })
    // 建立新的session时，触发
    server.on('session', (session) => {
        console.log('the session event is emitted')
    })
    // 每次有请求时，都会触发此事件
    server.on('request', (request, response) => {
        console.log('the request event is emitted')
    })

    server.on('stream', (stream) => {
        setTimeout(() => {
            stream.end('hello from server')
        }, 6000);
    })

    server.on('timeout', () => {
        console.log('the timeout event is emitted')
        // 停止服务器建立新会话。不过之前已经建立的连接可正常使用，如果要正常关闭服务器，需要在
        // 所有的session上调用http2session.close()
        server.close()

    })
    // 设置超时，如果服务器在5秒内，没有响应的话，就会停止触发timeout事件
    server.setTimeout(5000)
}

simpleDemo()