const http = require('http')
const net = require('net')
const { URL } = require('url')

function demo() {
    http.createServer((req, res) => {
        console.log('receive request from client')
        // console.log(req)
        res.end('hello from server')
    }).listen(8000)
}

/**
 * 监听connect事件，做代理
 */
function connectDemo1() {
    const proxy = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain'})
        res.end('okay')
    })

    proxy.on('connect', (req, clientSocket, head) => {
        const { port, hostname} = new URL(`http://${req.url}`)
        const serverSocket = net.connect(port || 80, hostname, () => {
            clientSocket.write('HTTP/1.1 200 Connection Established\r\n' + 
            'Proxy-agent: Node.js-Proxy\r\n' +
            '\r\n')
        })
        serverSocket.write(head)
        serverSocket.pipe(clientSocket)
        clientSocket.pipe(serverSocket)
    })

    proxy.listen(8000, '127.0.0.1')
}

// connectDemo1()
demo()