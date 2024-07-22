const cluster = require('cluster')
const http = require('http')
const process = require('process')

if (cluster.isPrimary) {
    let numReqs = 0
    setInterval(() => {
        console.log(`numReqs = ${numReqs}`)
    }, 1000)

    function messageHandlers(msg) {
        if (msg.cmd && msg.cmd === 'notifyRequest') {
            numReqs += 1
        }
    }

    const numCPUS = require('os').availableParallelism()

    for (let i = 0; i < numCPUS; i++) {
        cluster.fork()
    }

    for (const id in cluster.workers) {
        cluster.workers[id].on('message', messageHandlers)
    }
} else {
    http.createServer((req, res) => {
        res.writeHead(200)
        res.end('hello world\n')
        process.send({cmd: 'notifyRequest'})
    }).listen(8000)
}