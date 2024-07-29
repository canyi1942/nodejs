/**
 * http.incomingMessage: 表示客户端或者服务端接受到的响应，它继承自stream.Readle
 * 这个类的实例在客户端表示http的响应，在服务端表示http的请求
 */

const http = require('http')

function incomingMessageOfClient() {
    const client = http.request({
        host: '127.0.0.1',
        port: 8000,
        path: '/',
        method: 'get'
    })

    client.setHeader('Content-type', 'text/plain')
    client.write('message from client')
    client.end()

    client.on('response', (res) => {
        res.on('close', () => {
            console.log('the close listener was emitted')
             // 注销socket
            res.destroy()
            // 查看socket 是否已被注销
            console.log(res.destroyed)
            console.log('res.complete', res.complete)

        })

        res.on('data', (chunk) => {
            console.log('the data listener was emitted:', chunk.toString())
        })

        res.on('end', () => {
            console.log('the end listener was emitted')
        })

        res.on('readable', () => {
            console.log('the readable was emitted')
        })

        res.on('pause', () => {
            console.log('the pause listener was emitted')
        })

        res.on('resume', () => {
            console.log('the resume listener was emitted')
        })

        // 如果已接收并成功解析完整的http消息，res.complete = true
        console.log('res.complete', res.complete)

       
        // 响应头的键值对，标头名称是小写
        // 如果没有特殊处理，重复的标头会被丢弃
        console.log('res.headers:', res.headers)

        console.log('res.method:', res.method)

        console.log('res.statusCode:', res.statusCode)

        console.log('res.statusMessage', res.statusMessage)

    })

    client.on('error', (err) => {
        console.error('the error listener was emitted:', err)
    })

    client.end()
}

incomingMessageOfClient()