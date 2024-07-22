/**
 * dgram 用于生成和管理udp socket
 * 1:udp: user datagram protocal 
 * 2: udp是无连接、不可靠的传输协议，其优势在于传输速度快、开销小
 * 3：适用于视频流、音频流等
 */
const dgram = require('dgram')

const server = dgram.createSocket('udp4', (msg, rinfo) => {
    console.log(`server createSocket callback: ${msg}    from ${rinfo.address}: ${rinfo.port} ${rinfo.family}`)
})

server.on('message', (msg, rinfo) => {
    console.log(`Server received : ${msg} from ${rinfo.address}: ${rinfo.port}`)

    server.send('Message Received', rinfo.port, rinfo.address, (err) => {
        if (err) console.error(error)
    })
})

server.on('error', (err) => {
    console.error(`server error: ${err.stack}`)
    server.close()
})

server.on('listening', () => {
    console.log('server is listening')
    const address = server.address()
    console.log(`server listening ${address.address}: ${address.port}`)
})

server.on('connect', (stream) => {
    console.log('connect')
})

server.bind(41234, () => {
    console.log('Server is listening on port 41234')
})