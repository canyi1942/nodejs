const http = require('http')

function checkDemo() {
    const server = http.createServer()
    server.listen(8000)

    server.on('checkContinue', (req, res) => {
        console.log('checkContinue')
    })

    server.on('checkExpectation', (req, res) => {
        console.log('checkExpectation')
    })

    // request用于监听客户端的请求，在createServer函数中的回调函数，其实就是自动监听了request函数
    server.on('request', (req, res) => {
        console.log('request')
    })
}

checkDemo()

