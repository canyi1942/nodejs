const http = require('http')
const { AsyncLocalStorage } = require('async_hooks')

const asyncLocalStorage = new AsyncLocalStorage()

function logWithId(msg) {
    const id = JSON.stringify(asyncLocalStorage.getStore())
    console.log(`${id !== undefined ? id : '-'}`, msg, '--', num, idSeq)
}

let idSeq = 0
let num = 0

http.createServer((req, resp) => {
    console.log('http request init')
    num++
    asyncLocalStorage.run({
        id:idSeq++,
        num
    }, () => {
        logWithId('start')
        setImmediate(() => {
            logWithId('finish')
            resp.end()
        })
    })
    console.log('http req end')
}).listen(8080)

http.get('http://localhost:8080')
http.get('http://localhost:8080')