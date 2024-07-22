import net from 'net'

const socket = net.createConnection({port: 3000}, () => {
    console.log('connect on server')
    socket.write('Hello from client')
})

socket.on('data', (data) => {
    console.log('reveive from server', data.toString())
    socket.end()
})

socket.on('error', (error) => {
    console.log('client error', error)
})

socket.on('end', () => {
    console.log('disconnected from server')
})

console.log(socket.address())

console.log(socket.remo)