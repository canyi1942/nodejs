import net from 'net'

const server = net.createServer((socket) => {
    console.log('client connect')

    socket.on('data', (data) => {
        console.log('receive client ', data.toString())

        socket.write('Hello from server')

    })

    socket.on('end', () => {
        console.log('client disconnected')
    })

    socket.on('error', (error) => {
        console.log('socket error', error)
    })

}).listen(3000, () => {
    console.log('server listen on port 3000')
})


setTimeout(() => {
    server.close((error) => {
        console.log('server do close action')
    })
}, 10000);

// 获取当前连接数
server.getConnections((error, count) => {
    if (error) console.log(error)
    console.log(count)
})

console.log(server.address())

console.log('server.connections', server.connections)



