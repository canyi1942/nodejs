const http2 = require('http2')

function simpleDemo() {
    const client = http2.connect('http://localhost:8000')

    const stream = client.request({
        ':path': '/'
    })

    stream.end()

    stream.on('data', (chunk) => {
        console.log(chunk.toString())
    })
}

simpleDemo()