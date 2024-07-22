/**
 * 1：addMembership 用于加入一个多播组，从而接受发送到该多播组的UDP数据包，多播是一种数据传输方式，允许将
 * 数据发送到多个接收者
 */
const dgram = require('dgram')

const server = dgram.createSocket('udp4')

server.on('listening', () => {
    const address = server.address()
    console.log(`Socket listening on ${address.address} :${address.port}`)
    server.addMembership('224.0.0.114')
})

server.on('message', (msg, rinfo) => {
    console.log(`received message from ${rinfo.address}: ${rinfo.port}--${msg}`)
})

server.bind(41234)