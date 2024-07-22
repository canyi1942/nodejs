process.on('message', (message) => {
    console.log(`message from father: ${message.hello}`)

    process.send({error: 'something went wrong'})

    process.exit(11)
})