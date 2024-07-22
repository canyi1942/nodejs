const logEvents = require('./logEvent')
const eventsEmit = require('events')
const path = require('path')
const http = require('http')
const fs = require('fs')
const fsp = require('fs').promises

class MyEvent extends eventsEmit {}

const myEvent = new MyEvent()

const PORT = process.env.PORT || 3500

const serveFile = (filePath, contentType, response) => {
    try {
        const data = fs.readFileSync(filePath, 
            !contentType.includes('image') ? 'utf-8' : ''
        )
        response.writeHead(200, {
            'Content-Type': contentType
        })
        response.end(data)
    } catch (error) {
        console.error(error)
        response.statusCode = 500
        response.end()
    }
}



const server = http.createServer((req, resp) => {
    console.log(req.url, req.method)
    const extension = path.extname(req.url)
    let contentType

    switch(extension) {
        case '.css':
            contentType = 'text/css'
            break
        case '.html':
            contentType = 'text/html'
            break
        case '.txt':
            contentType = 'text/plain'
            break
        case '.json':
            contentType = 'application/json'
            break
        case '.jpg':
            contentType = 'image/jpeg'
            break
        case '.png':
            contentType = 'image/png'
            break;
        default:
            contentType = 'text/html'
    }

    let filePath = path.join(__dirname, req.url)
    serveFile(filePath, contentType, resp)
})

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

const et = new eventsEmit()

et.on('log', (dt) => {
    logEvents(dt)
})

setTimeout(() => {
    et.emit('log', 'my event')
}, 3000)