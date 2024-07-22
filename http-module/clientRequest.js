/**
 * http.ClientRequest
 * 客户端发送http请求时生成的对象，用于管理请求，可以取消请求、设置超时、设置keep-alive、监听服务端响应
 * 1. http.request函数调用时，并没有真正的去发送请求，而是进入待发送队列，真正发送请求是需要调用write或者end的
 *    如果不执行这两个函数中的一个，client就会一直等待，请求并不会发送
 */
const http = require('http')
const { chunk, method } = require('lodash')

/**
 * 示例一个最小路径的demo
 */
function simpleDemo() {
    const options = {
        host: '127.0.0.1',
        port: 8000,
        path: '/',
        method: 'get'
    }

    const clientRequest = http.request(options, (res) => {
        console.log('获取到服务端的响应')
        res.on('data', (chunk) => {
            console.log(chunk.toString())
        })
    })

    clientRequest.setHeader('Content-type', 'text/html')
    clientRequest.write('name=weipeng')
    clientRequest.end()

    // 设置请求超时时间，如果超时则取消请求destroy
    clientRequest.setTimeout(1000, () => {
        console.log('请求超时')
        clientRequest.destroy()
    })

    clientRequest.on('error', (err) => {
        console.error(err)
    })
}

function listenerDemo() {
    const options = {
        hostname: 'localhost',
        port: 8000,
        path: '/',
        method: 'get'
    }
    const clientRequest = http.request(options, (res) => {
        console.log('receive message from server')
    })

    // 设置请求超时时间，如果超时则取消请求destroy
    clientRequest.setTimeout(1000, () => {
        console.log('请求超时')
        clientRequest.destroy()
    })

    // 设置socket的keep-alive选项
    clientRequest.setSocketKeepAlive(true)

    clientRequest.on('error', (err) => {
        console.log(`error message`)
    })

    // 写入请求体
    clientRequest.write('name=tom')
    // 表示请求已经结束，而且可选的在调用end时，发送请求体的最后一部分数据
    clientRequest.end()

    // 当请求已全部提交给底层网络时，触发该事件
    clientRequest.on('finish', () => {
        console.log(`request done`)
    })

    // 当接受到服务端响应时触发，此事件只触发一次
    clientRequest.on('response', (res) => {
        console.log(`response.statusCode: ${res.statusCode}`)
        res.on('data', (chunk) => {
            console.log('response listener:', chunk)
        })
    })

    // 当socket连接完成时触发
    clientRequest.on('socket', (socket) => {
        console.log('socket 被分配')
    })

    // 当底层socket不活动时触发，这仅通知我们socket处于空闲状态，如果有必要的话，可以手动销毁
    clientRequest.on('timeout', (socket) => {
        console.log(`socket is free ${socket}`)
    })

    clientRequest.on('abort')

    clientRequest.on('close', () => {
        console.log('request finish or socket close')
    })

}

/**
 * 请求对象的一些属性
 */
function attrDemo() {
    const options = {
        host: '127.0.0.1',
        port: 8000,
        path: '/',
        method: 'get'
    }

    const clientRequest = http.request(options, (res) => {
        console.log('获取到服务端响应')
    })

    clientRequest.end()

    // 获取请求的socket
    clientRequest.on('response', (res) => {
        console.log('clientRequest.socket', clientRequest.socket)
    })

    // 获取当前请求的路径
    console.log(`clientRequest.path`, clientRequest.path)

    // 获取当前请求的方法
    console.log('clientRequest.method', clientRequest.method)

    // 获取当前请求的服务器的主机
    console.log('clientRequest.host', clientRequest.host)

    // 获取当前请求的协议
    console.log('clientRequest.protocol', clientRequest.protocol)

    // 当前请求是否已被注销
    console.log('clientRequest.destroyed', clientRequest.destroyed)

    // 请求是否支持重复利用已生成的socket
    console.log('clientRequest.reusedSocket', clientRequest.reusedSocket)

    // 是否已调用end
    console.log('clientRequest.writableEnded', clientRequest.writableEnded)

    // 是否在finish事件之前，已经把所有数据刷新到TCP流中
    console.log('clientRequest.writableFinished', clientRequest.writableFinished)
}

/**
 * method: connect 
 * 当metho=connect时，监听connect事件，配合服务器可做代理使用
 */
function connectDemo() {
    const options = {
        port: 8000,
        host: '127.0.0.1',
        method: 'CONNECT',
        path: 'www.google.com:80'
    }
    const client = http.request(options)
    client.end()

    client.on('connect', (res, socket, head) => {

        console.log('client got connected')

        socket.write('GET / HTTP/1.1\r\n' +
            'Host: www.google.com:80\r\n' +
            'Connection: close\r\n' +
            '\r\n')
        
        socket.on('data', (chunk) => {
            console.log(chunk.toString())
        })

        socket.on('error', () => {
            socket.destroy()
        })
    })
}

/**
 * 对请求头进行增删改查的操作
 * 除去getRawHeaderNames()、setHeader区分大小写外，其它函数中的键都不区分大小写
 * 键重复设置，只保留最后一个key
 */
function actionHeaders() {
    const options = {
        port: 8000,
        host: '127.0.0.1',
        path: '/',
        method: 'get'
    }
    const clientRequest = http.request(options, (res) => {
        console.log('接受到服务端的请求')
    })

    // 限制服务器设置键值对的最大个数
    clientRequest.maxHeadersCount = 100

    // 设置请求头
    clientRequest.setHeader('content-type', 'text/html')
    clientRequest.setHeader('Content-Length', 10000)
    clientRequest.setHeader('cookie', ['type=ninja', 'language=javascript'])
    clientRequest.setHeader('Foo', 'bar')
    clientRequest.setHeader('Foo', 'bar1')


    // 获取请求头,不区分大小写
    const contentType = clientRequest.getHeader('content-type')
    const contentLength = clientRequest.getHeader('content-length')
    const cookie = clientRequest.getHeader('Cookie')
    console.log(contentType)
    console.log(contentLength)
    console.log(cookie)

    // 返回请求头键值对中的所有键值,会去重，如果键值重复，只保留一个，所有键都是小写
    const headerNames = clientRequest.getHeaderNames()
    console.log('getHeaderNames: ', headerNames)

    // 返回请求头的原始的键的数组，区分大小写
    const rawhHeaderNames = clientRequest.getRawHeaderNames()
    console.log(rawhHeaderNames)

    // 返回请求头对象的浅拷贝
    // 键都是小写
    // 返回的对象不是继承js的object，所以object上的方法，无法使用
    const header = clientRequest.getHeaders()
    console.log('getHeaders: ', header)
    header.foo = 'bar'
    console.log(`修改header的foo后的header值，`, header)
    console.log(`打印client.getHeaders`, clientRequest.getHeaders())

   

    // 判断给出的name是否存在于headers中,不区分大小写
    const flag = clientRequest.hasHeader('cookie')
    console.log('hasHeader(cookie): ', flag)

    // 删除指定的键
    // 键不区分大小写
    clientRequest.removeHeader('Cookie')
    console.log('removeHeader: ', !clientRequest.hasHeader('Cookie'))

    // 将请求头打包到TCP中。为了提高传输效率，nodejs通常会缓冲请求头，直到调用end或者write，会把请求头和请求正文，一次性
    // 打包到流中；如果即没有调用end，write也需要很久才写入，则可以直接调用flushHeaders绕过优化，并启动请求
    clientRequest.flushHeaders()

    clientRequest.end()
}

simpleDemo()
// attrDemo()
// actionHeaders()
// connectDemo()
// demo()