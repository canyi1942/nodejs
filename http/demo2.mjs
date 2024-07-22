import fs from 'fs'
import http from 'http'
import path from 'path'
import _ from 'lodash'

const server = http.createServer((req, resp) => {

    console.log(req.url, req.method)
    resp.setHeader('Content-Type', 'text/html')
    let path1 = '/views/'

    switch(req.url) {
        case '/':
            path1 += 'home.html'
            break
        case '/home':
            resp.statusCode = 301
            resp.setHeader('Location', 'https://zhidao.baidu.com/')
            resp.end()
            path1 += 'home.html'
            break;
        case '/about':
            path1 += 'about.html'
            break;
        default:
            path1 += '404.html'
    }
    fs.readFile(path.resolve('./') + path1, (error, data) => {
        if (error) {
            console.log(error)
            resp.end()
        } else {
            resp.end(data)
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log('服务器启动 3000')
})