/**
 * agent 用于管理http客户端的请求的连接，包括连接的复用、维护连接池、处理代理等
 */
const http = require('http')

function demo1() {
    const agent = new http.Agent({
        keepAlive: true, // 当设置为true时，agent会在tcp 连接空闲时保持其打开的状态，以便复用
        maxSockets: 10, // 设置最大并发socket连接数，默认值为Infinity
        maxFreeSockets: 5, // 设置空闲状态下的最大socket数量，默认值为256
        timeout: 10000 // 设置socket超时时间，单位为毫秒
    })

    const options = {
        hostname: 'localhost',
        port: 8000,
        path: '/',
        method: 'get',
        agent: agent
    }

    const req = http.request(options, (res) => {
        console.log(`status: ${res.statusCode}`)

        // res.setEncoding('utf-8')

        res.on('data', (chunk) => {
            console.log(`body: ${chunk}`)
        })

    })

    req.on('error', (err) => {
        console.error(err)
    })

    req.end()
}

demo1()