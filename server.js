const fs = require('fs')
const url = require('url')
const http = require('http')

function start(route) {
    function onRequest(request, response) {
        const urlStr = url.parse(request.url)
        const {pathname, query} = urlStr
        route(pathname)
        console.log('receive', pathname, query)
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.write('<h1>hello nodejs</h1>')
        response.end()
    }
    
    http.createServer(onRequest).listen(8081)
    console.log('Server has start')
}

exports.start = start