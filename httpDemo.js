const http = require('http')

const server = http.createServer((request, response) => {
    console.log(request.url, request.method)
    response.writeHead(200, {
        'Content-Type': 'text/html' 
    })
    response.end('<H1>hello nodejs</H1>')
})

server.listen(8080)

console.log('Server is running at http://127.0.0.1:8080/');
