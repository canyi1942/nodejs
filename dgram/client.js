const dgram = require('dgram')

const client = dgram.createSocket('udp4')

client.on('message', (msg, rinfo) => {
    console.log(`Client received: ${msg} from ${rinfo.address}: ${rinfo.port}`)
    client.close(() => {
        console.log('client closed')
    })
})

client.send('hello, udp server', 41234, 'localhost', (error) => {
    if (error) console.error(error)
    
})