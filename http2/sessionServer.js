/**
 * http2Session: 表示客户端和服务器端的会话，该类是一个基类，客户端和服务器端都有子类，在子类上可以使用父类的方法、属性、事件对象。
 *               该类的实例会和socket或者tlsSocket绑定，当*socket被摧毁时，会话对象也不可使用。
 *               不要直接使用socket，要使用会话对象
 *               在客户端的子类名称：ClientHttp2Session,在服务端的子类名称：ServerHttp2Session
 *               不要new 会话对象，在一些方法中，会返回会话对象
 * ServerHttp2Session: 在http2SecureServer实例的session事件回调中返回，增加了altsvc和origin函数；同时增加了connect,stream两个监听事件
 */
const http2 = require('http2')
const fs = require('fs')
const path = require('path')

const serverOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

const server = http2.createSecureServer(serverOptions)

server.on('stream', (stream, headers) => {
    console.log('the listener stream waw emitted')
    stream.respond({
        'content-type': 'text/plain',
        ':status': 200
    })
    stream.end('hello')
})

server.on('session', (serverHttp2Session) => {
    console.log('the session listener was emitted')

    serverHttp2Session.on('goaway', (errorCode, lastStreamId, opaqueData) => {
        console.log('the listener of goaway was emitted')
        console.log(`goaway received: errorCode=${errorCode}, lastStreamId=${lastStreamId}, opaqueData=${opaqueData}`)
    })
})

server.listen(8000, () => {
    console.log('server is listening on 8000')
})