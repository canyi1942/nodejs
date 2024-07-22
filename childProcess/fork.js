const { fork } = require('child_process')
const path = require('path')

function demo1() {
    const childProcess = fork(path.join(__dirname, 'child.js'))

    childProcess.on('message', (message) => {
        console.log(`Message from child: ${message.foo}`)
    })

    childProcess.send({hello: 'world'})
}

function demo2() {
    const cpus = require('os').cpus().length

    for (let i = 0; i < cpus; i++) {
        const child = fork(path.join(__dirname, 'child1.js'))

        child.on('message', (data) => {
            console.log(`result from child ${child.pid}: ${data.sum}`)
        })

        child.send({task: 'compute', data: i})
    }
}

function demo3() {
    const child = fork(path.join(__dirname, 'child2.js'))

    child.on('message', (message) => {
        console.log(`message from child : ${message}`)
    })

    child.on('error', (error) => {
        console.error(error)
    })

    child.send({hello: 'world'})
}

function demo4() {
    const child1 = fork(path.join(__dirname, 'child3.js'))
    const child2 = fork(path.join(__dirname, 'child4.js'))

    child1.on('message', (message) => {
        console.log(`message from child1: ${message}`)
        child2.send(message)
    })

    child2.on('message', (message) => {
        console.log(`message from child2: ${message}`)
        child1.send(message)
    })

    child1.send({start: 'start'})
}

demo4()
// demo3()
// demo2()
// demo1()