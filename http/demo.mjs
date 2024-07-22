import http from 'http'
import url from 'url'

http.createServer((req, resp) => {
    console.log('req.url = ', req.url)
    console.log('url.parse', url.parse(req.url, true, false))
    // console.log('req', req)
    resp.writeHead(200, {
        'Content-Type': 'text/plain',
    })
    resp.write('hello write\n')
    resp.end('hello http 111')
}).listen(8080)