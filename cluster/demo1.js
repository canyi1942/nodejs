const cluster = require('cluster')
const http = require('http')
const os = require('os')

function demo1() {
    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`)

        for (let i = 0; i < os.cpus().length; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
            // cluster.fork()
        })
    } else {
        http.createServer((req, res) => {
            res.writeHead(200)
            console.log(process.pid)
            res.end('hello, world')
            process.exit(1)
        }).listen(8080)
        console.log(`worker ${process.pid} started`)
    }

}

demo1()