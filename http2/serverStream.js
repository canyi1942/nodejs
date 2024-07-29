/**
 * ServerHttp2Stream是Http2Stream的子类，关于Http2Stream的介绍，可以详见clientStream.js中的介绍
 * 
 * ServerHttp2Stream: 监听stream事件，在回调函数中获取
 */

const http2 = require('node:http2')
const fs = require('fs')
const path = require('path')

const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
}
function simpleDemo() {
   const server = http2.createSecureServer(options)
   server.listen(443, () => {
       console.log('http2 server is listening on port 443')
   })
   server.on('stream', (serverHttp2Stream) => {
      console.log('New stream created')
      serverHttp2Stream.respond({
          'content-type': 'text/plain',
          ':status': 200
      })
      serverHttp2Stream.write('this is the response body')
      serverHttp2Stream.end()
      serverHttp2Stream.on('close', () => {
          console.log(`Stream ${serverHttp2Stream.id} has been fully closed`)
      })
   })
}

function abortedListener() {
    const http2SecureServer = http2.createSecureServer(options)

    http2SecureServer.listen(443, () => {
        console.log('http2 server is listening on port 443')
    })

    http2SecureServer.on('stream', (serverHttp2Stream) => {
        console.log('New stream created')

        serverHttp2Stream.respond({
            'content-type': 'text/plain',
            ':status': 200
        })

        setTimeout(() => {
            serverHttp2Stream.end('End of the response')
        }, 5000);

        serverHttp2Stream.write('This is the response body')

        serverHttp2Stream.on('close', () => {
            console.log(`Stream ${serverHttp2Stream.id} has been fully closed`)
        })

        serverHttp2Stream.on('aborted', () => {
            console.log(`Stream ${serverHttp2Stream.id} was aborted`)
        })
    })

    http2SecureServer.on('error', (error) => {
        console.log('the error event is emitted:', error)
    })
}

function commonListener() {
    const http2SecureServer = http2.createSecureServer(options)
    http2SecureServer.listen(443)

    http2SecureServer.on('error', (error) => {
        console.log('the error event is emitted')
    })

    http2SecureServer.on('stream', (serverHttp2Stream, incomingHttpHeaders, flags) => {
        console.log('the stream event is emitted')
        serverHttp2Stream.respond({
            'content-type': 'text/plain',
            ':status': 200
        })

        serverHttp2Stream.write('hello from server for commonListener')

        serverHttp2Stream.end('end')
    })
}

function trailersListener() {
    const http2SecureServer = http2.createSecureServer(options)
    http2SecureServer.listen(443)

    http2SecureServer.on('error', (error) => {
        console.log('the error event is emitted:', error)
    })

    http2SecureServer.on('timeout', () => {
        console.log('the timeout event is emitted')
    })

    http2SecureServer.on('stream', (serverHttp2Stream) => {
        console.log('New stream created')

        serverHttp2Stream.waitForTrailers = true
        serverHttp2Stream.respond({
            'content-type': 'text/plain',
            ':status': 200
        }, {
            waitForTrailers: true
        })
        
        serverHttp2Stream.on('wantTrailers', () => {
            serverHttp2Stream.sendTrailers({
                'custom-trailer-header': 'this is a trailers header'
            })
        })

        serverHttp2Stream.write('i am body')

        serverHttp2Stream.end('end')

        
    })

    http2SecureServer.on('session', (serverHttp2Session) => {

    })

}

function pushStream() {
    const http2SecureServer = http2.createSecureServer(options)

    http2SecureServer.listen(443)

    http2SecureServer.on('error', (error) => {
        console.log('the event of error is emitted:', error)
    })

    http2SecureServer.on('timeout', () => {
        console.log('the timeout event is emitted')
    })

    http2SecureServer.on('stream', (serverHttp2Stream) => {

        serverHttp2Stream.on('error', (error) => {
            console.log('the event of stream is emitted:', error)
        })

        serverHttp2Stream.on('timeout', () => {
            console.log('the timeout event is emitted')
        })

        serverHttp2Stream.respond({
            ':status': 200
        })

        serverHttp2Stream.pushStream({ ':path': '/'}, (err, pushStream, headers) => {
            if (err) throw err

            pushStream.respond({':status': 200})
            pushStream.end('some pushed data')
        })

        serverHttp2Stream.end('some data')
    })
}

function respondWithFd() {
    const server = http2.createSecureServer(options).listen(443)

    server.on('stream', (stream) => {
        const fs = require('fs')
        const fd = fs.openSync('./index.html')

        stream.respondWithFD(fd)
        stream.on('close', () => fs.closeSync(fd))
    })
}

function respondWithFilePath() {
    const server = http2.createSecureServer(options).listen(443)

    server.on('stream', (stream) => {
        stream.respondWithFile('./index.html')

        stream.on('close', () => {
            console.log('stream is closed')
        })
    })
}

respondWithFilePath()
// respondWithFd()
// pushStream()
// trailersListener()
// commonListener()
// abortedListener()
// simpleDemo()

