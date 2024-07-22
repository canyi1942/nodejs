process.on('message', (message) => {
    console.log(`child2 received ${message}`)
    process.send({from: 'child2', message: 'Hello from child2'})
})