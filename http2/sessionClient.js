/**
 * 关于http2Session的更多的信息，请参考server.js中的注释
 * ClientHttp2Session是Http2Session的子类
 * ClientHttp2Session的实例由http2.connect函数创建并返回
 * 该子类新增了两个事件监听：altsuv,origin;和request函数
 * 
 * 关于http2Stream的更多信息，请参考server.js中的注释
 * ClientHttp2Stream 是http2Stream的子类
 * clientHttp2Stream 由clientHttp2Session.request创建
 * ClientHttp2Stream新增了几个事件监听：continue,headers,push,response
 */
const fs=require('fs')
const http2 = require('http2')

const client = http2.connect('https://localhost:8000', {
    ca: fs.readFileSync('./cert.pem'),
})

client.on('error', (err) => {
    console.error(err)
})
// 在http2session被销毁时触发
client.on('close', () => {
    console.log('the close listener was emitted')
})
// 客户端和服务端连接成功时触发
client.on('connect', (session, socket) => {
    console.log('the connect listener was emitted')

    session.settings({enablePush: true})
    // setTimeout(() => {
    //     console.log('Sending goway frame')
    //     session.goaway()
    // }, 5000)
})

client.settings({enablePush: true})

client.on('localSettings', (settings) => {
    console.log('localSettings listener was emitted')
    console.log(settings)
})
// 发送帧时发生错误，会触发当前事件；如果是某个流有问题，则在此事件之后关闭改流，如果和流无关，则关闭该会话
client.on('frameError', (frameType, errorCode, streamId) => {
    console.log('the listener of frameError was emitted')
})


function simpleDemo() {
    const req = client.request({':path': '/'})

    req.on('headers', (headers, flags) => {
        console.log('the headers listener was emitted')
        console.log('headers:', headers)
        console.log('flags:', flags)
    })

    req.on('response', (headers, flags) => {
        console.log('the response listener was emitted')
        console.log('headers:', headers)
        console.log('flags:', flags)
    })

    req.on('data', (chunk) => {
        console.log(chunk.toString())
    })

    req.on('end', () => {
        console.log('the listener of end was emitted')
        client.close()
    })
}

function multiRequest() {
    const req1 = client.request({':path': '/path1'})
    const req2 = client.request({':path': '/path2'})


    req1.priority({
        weight: 10,
        parent: 5,
        exclusive: false
    })

    req2.priority({
        weight: 200,
        parent: 0,
        exclusive: false
    })

    req1.on('data', (chunk) => {
        console.log('req1 message: ', chunk)
    })

    req2.on('data', (chunk) => {
        console.log('req2 data:', chunk)
    })

    req1.on('end', () => {
        
        console.log('req1 end')
    })
    
    req2.on('end', () => {
        console.log('req2 end')
        client.close()
    })

}

function streamDemo() {
    const clientHttp2Stream = client.request(({':path': '/'}))

    //
    // 以下为继承自父类的监听函数
    //
    clientHttp2Stream.on('aborted', () => {
        console.log('the abort event was emitted')
    })

    clientHttp2Stream.on('ready', () => {
        console.log('the ready event was emitted')
    })

    clientHttp2Stream.on('close', () => {
        console.log('the close event was emitted')
    })

    clientHttp2Stream.on('error', (err) => {
        console.log('the error event was emitted:', err)
    })

    clientHttp2Stream.on('frameError', (type, code, id) => {
        console.log('the frameError event was emitted')
    })

    clientHttp2Stream.on('timeout', () => {
        console.log('the timeout event was emitted')
    })

    clientHttp2Stream.on('trailers', (headers, flags) => {
        console.log('trailers event was emitted')
    })

    clientHttp2Stream.on('wantTrailers', () => {
        console.log('the wantTrailers event was emitted')
    })

    //
    // 以下为ClientHttp2Stream自身所拥有的监听函数
    //
    clientHttp2Stream.on('continue', () => {
        console.log('the continue event was emitted')
    })

    clientHttp2Stream.on('headers', () => {
        console.log('the headers event was emitted')
    })

    clientHttp2Stream.on('push', () => {
        console.log('the push event was emitted')
    })

    clientHttp2Stream.on('response', () => {
        console.log('the response event was emitted')
    })
}

multiRequest()
// simpleDemo()