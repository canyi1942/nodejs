const fs = require('fs')
const url = require('url')
const path = require('path')
const http = require('http')

const root = path.resolve('.')

const server = http.createServer((req, resp) => {
    const pathName = url.parse(req.url).pathname
    const filePath = path.join(root, pathName)

    fs.stat(filePath, (error, data) => {
        if (error) {
            console.error(error)
            resp.writeHead(404)
            resp.end('404 not found')
        } else {
            resp.writeHead(200)
            fs.createReadStream(filePath).pipe(resp)
        }
    })
})

server.listen(8080)

console.log('server is running on http://127.0.0.1:8080')