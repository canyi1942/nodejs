/**
 * serverResponse: 由服务器内部创建，并返回，提供了对响应流的基本操作
 */
const http = require('http')

function simpleDemo() {
    http.createServer((req, res) => {
        console.log('receive message from client')
        res.end('message from server')
    }).listen(8000, () => {
        console.log('server is started')
    })
}

function listenersDemo() {
    http.createServer((req, res) => {
        // drain: 当缓冲区可写入时触发此事件。缓冲区如果没有空间时，会拒绝写入
        res.on('drain', () => {
            console.log('the listener of drain emitted')
        })
        // socket关闭时触发此事件
        res.on('close', () => {
            console.log('the listener of close was emitted')
        })
        // 响应头和正文已全部写入网络
        res.on('finish', () => {
            console.log('the listener of finish was emited')
        })

        res.on('error', (err) => {
            console.error('the listener of error was emitted:', err)
        })

        res.on('pipe', (src) => {
            console.log('the pipe listener emitted:', src)
        })

        res.on('unpipe', (src) => {
            console.log('the listener of unpipe emitted:', src)
        })

        const fs = require('fs')
        const readableStream = fs.createReadStream('./serverForClient.js')
        res.statusCode = 200
        res.statusMessage = 'success'
        res.setHeader('Content-Type', 'text/plain')
        readableStream.pipe(res)
        readableStream.on('end', () => {
            console.log('File has been read completely')
        })

        res.end('send message from server')

    }).listen(8000, () => {
        console.log('server is started')
    })
}

listenersDemo()
// simpleDemo()