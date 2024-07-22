/**
 * addSpecialMemberShip: 指定多播组，只接受指定来源的消息
 */
const dgram = require('dgram')

const server = dgram.createSocket('udp4')

server.on('listening', () => {
    const address = server.address()
    console.log(`socket listening on ${address.address} : ${address.port}`)
    server.addSourceSpecificMembership('224.0.0.114', '192.168.1.1')
})

server.on('message', (msg, rinfo) => {
    console.log(`receive message from ${rinfo.address}: ${rinfo.port} - ${msg}`)
})

server.bind(41234)