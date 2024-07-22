process.on('message', (message) => {
    console.log(`child1 received: ${message}`)
    process.send({from: 'child1', message: 'hello from child1'})
})