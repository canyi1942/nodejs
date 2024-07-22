const http = require('http')

function clientDemo() {
    const options = {
        host: '127.0.0.1',
        port: 8000,
        path: '/',
        method: 'get'
    }
    const client = http.request(options)
    client.setHeader('Expect', '100-continue')
    client.on('response', (res) => {
        console.log('client receive message from server')
        console.log('statusCode', res.statusCode)
    })
    client.end()
}

clientDemo()