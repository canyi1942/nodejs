/**
 * Http2Stream: 是http2的双向工作流，一个tcp链接可以有多个流，这些流互相独立，并行传输数据
 * 
 * http2的众多优点是http2stream实现的，其主要特性：
 *  1. 多路复用：每个tcp链接，可以有多个流，并行发送数据
 *  2. 双向通信：流是双向的，可以同时发送和接受数据
 *  3. 头部压缩：使用HPACK算法对http头部进行压缩，减少数据传输量
 *  4. 流的优先级：每个流可以设置优先级，以便更多地管理资源和带宽
 * 
 * Http2Stream是一个父类，ClientHttp2Stream,ServerHttp2Stream是其子类
 * 
 * ClientHttp2Stream: 由clientHttp2Session创建或on('push')生成
 */

const http2 = require('node:http2')
const fs = require('fs')

const ca = fs.readFileSync('./cert.pem')

function simpleDemo() { 
    const clientHttp2Session = http2.connect('https://localhost:443', { ca })

    clientHttp2Session.on('error', (err) => {
        console.log('Client err:', err)
    })

    clientHttp2Session.on('connect', (session, socket) => {
        console.log('Client connected.')

        const clientHttp2Stream = clientHttp2Session.request({ ':path': '/'})

        // 监听头部返回信息
        clientHttp2Stream.on('response', (incomingHttpHeaders, flags) => {
            console.log('Stream headers:', incomingHttpHeaders)
            console.log('Stream flags:', flags)
        })
        // 监听返回正文
        clientHttp2Stream.on('data', (chunk) => {
            console.log('serverHttp2Stream data:', chunk.toString())
        })

        // 响应流完成数据传输后，触发该事件
        clientHttp2Stream.on('end', () => {
            console.log('serverHttp2Stream ended')
            clientHttp2Session.close(() => {
                console.log('client closed')
            })
        })
        // stream 关闭时，触发该事件
        clientHttp2Stream.on('close', () => {
            console.log('clientHttp2Stream closed')
        })
        // stream流发生错误时，触发该事件
        clientHttp2Stream.on('error', (err) => {
            console.log('clientHttp2Stream error:', err)
        })

        clientHttp2Stream.end()

    })
}

/**
 * 学习aborted的用法
 * 客户端和服务端建立stream通信后，如果写入方未传输完毕，另一方直接关闭流通道，则会触发aborted事件
 */
function abortListener() {
    const clientHttp2Session = http2.connect('https://localhost:443', { ca })
    clientHttp2Session.on('error', (err) => {
        console.log('clientHttp2Session error emitted:', err)
    })
    clientHttp2Session.on('connect', (clientHttp2Session, tlsSocket) => {
        const clientHttp2Stream = clientHttp2Session.request({ ':path': '/'})
        console.log('clientHttp2StreamId:', clientHttp2Stream.id)
        //
        // 服务端未传输完数据，调用close或者destory 关闭stream流，会导致服务端异常中断，触发aborted事件
        //
        setTimeout(() => {
            // clientHttp2Stream.close()
            clientHttp2Stream.destroy()
            console.log('client aborted the request')
        }, 2000)
        clientHttp2Stream.on('response', (incomingHttpHeaders, flag) => {
            console.log('response is emitted:', incomingHttpHeaders)
        })

        clientHttp2Stream.on('data', (chunk) => {
            console.log('data is emitted:', chunk.toString())
        })

        clientHttp2Stream.on('end', () => {
            console.log('end is emitted')
        })

        clientHttp2Stream.on('error', () => {
            console.log('error is emitted')
        })

        clientHttp2Stream.on('close', () => {
            console.log('close is emitted')
        })

        clientHttp2Stream.end()
    })

    clientHttp2Session.on('close', () => {
        console.log('session is closed')
    })
}

function commonListener() {
    const clientHttp2Session = http2.connect('https://localhost:443', { ca })

    clientHttp2Session.on('error', (error) => {
        console.log('the error event was emitted:', error)
    })

    clientHttp2Session.on('frameError', (error) => {
        console.log('the frameError is emitted')
    })

    clientHttp2Session.on('close', () => {
        console.log('the close is emitted')
    })

    // 处理session回话中的超时情况
    clientHttp2Session.on('timeout', () => {
        console.log('timeout event is emitted')
        clientHttp2Session.close()
    })

    clientHttp2Session.on('connect', (clientHttp2Session, tlsSocket) => {

        console.log('the connect is emitted')
        const clientHttp2Stream = clientHttp2Session.request({':path': '/'})

        clientHttp2Stream.on('response', (incomingHttpHeaders) => {
            console.log('the response is emitted', incomingHttpHeaders)
        })

        clientHttp2Stream.on('data', (chunk) => {
            console.log('the chunk event is emitted', chunk.toString())
        })

        clientHttp2Stream.on('trailers', (headers, flags) => {
            console.log('Trailers event is emitted:', headers)
        })

        clientHttp2Stream.on('close', () => {
            clientHttp2Session.close()
        })

        clientHttp2Stream.end()
    })

}

function trailersListener() {
    const clientHttp2Session = http2.connect('https://localhost:443', { ca })

    clientHttp2Session.on('error', (error) => {
        console.log('the error event is emitted:', error)
        clientHttp2Session.close()
        !clientHttp2Session.destroyed && clientHttp2Session.destroy()
    })

    clientHttp2Session.on('connect', (session, tlsSocket) => {
        // 创建请求
        const clientHttp2Stream = clientHttp2Session.request({ ':path': '/'})
        // 发送请求
        clientHttp2Stream.end()

        // 监听服务器端发送的尾headers事件
        clientHttp2Stream.on('trailers', (headers, flags) => {
            console.log('the trailers event is emitted:', headers)
        })
        // 监听到服务器发送的正文
        clientHttp2Stream.on('data', (chunk) => {
            console.log('the data event is emitted:', chunk.toString())
        })
        // 监听到服务端发送的响应头
        clientHttp2Stream.on('response', (headers, flags) => {
            console.log('the response is emitted:', headers)
        })
        // 监听到本次服务终止的消息
        clientHttp2Stream.on('end', () => {
            console.log('the end event is emitted')
        })
        // 监听到stream流关闭的消息
        clientHttp2Stream.on('close', () => {
            console.log('the close event is emitted')
        })

    })

    clientHttp2Session.on('close', () => {
        console.log('the close event is emitted')
    })

    clientHttp2Session.on('frameError', (frameError) => {
        console.log('the frameError event is emitted:', frameError)
        clientHttp2Session.close()
        !clientHttp2Session.destroyed && clientHttp2Session.destroy()
    })

    clientHttp2Session.on('timeout', () => {
        console.log('the timeout event is emitted')
        clientHttp2Session.close()
        !clientHttp2Session.destroyed && clientHttp2Session.destroy()
    })
}


function pushStream() {
    const clientHttp2Session = http2.connect('https://localhost:443', { ca })

    clientHttp2Session.on('error', (error) => {
        console.log('the event of error is emitted:', error)
    })

    clientHttp2Session.on('frameError', (error) => {
        console.log('the frameError is emitted:', error)
    })

    clientHttp2Session.on('timeout', () => {
        console.log('the timeout of event is emittd')
    })

    clientHttp2Session.on('close', () => {
        console.log('the close is emitted')
    })

    clientHttp2Session.on('connect', (clientHttp2Session, tlsSocket) => {
        const clientHttp2Stream = clientHttp2Session.request({':path': '/'})

        clientHttp2Stream.on('push', (headers, flags) => {
            console.log('server push stream:', headers)
        })

        clientHttp2Stream.on('response', (headers) => {
            console.log('response event is emitted')
        })

        clientHttp2Stream.on('data', (chunk) => {
            console.log('data event is emitted:', chunk.toString())
        })

        clientHttp2Stream.on('end', () => {
            console.log('end event is emitted')
        })

        clientHttp2Stream.on('close', () => {
            console.log('close event is emitted')
            clientHttp2Session.close()
            clientHttp2Session.destroy()
        })

        clientHttp2Stream.end()

        clientHttp2Session.on("stream", (pushStream) => {
            pushStream.on('push', (responseHeaders) => {
                console.log('push stream response headers:', responseHeaders)
            })

            pushStream.on('data', (chunk) => {
                console.log('push stream data:', chunk.toString())
            })

            pushStream.on('end', () => {
                console.log('push stream enden')
            })

        })
    })


}


pushStream()
trailersListener()
// commonListener()
// abortListener()
// simpleDemo()