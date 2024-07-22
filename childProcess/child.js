process.on('message', (data) => {
    console.log(`from farther message: ${data.hello}`)

    process.send({foo: 'bar'})
})