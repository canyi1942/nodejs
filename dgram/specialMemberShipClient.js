const dgram = require('dgram')

const client = dgram.createSocket('udp4')

client.on('message', (msg, rinfo) => {
    console.log(`client received message from ${rinfo.address} : ${rinfo.port} - ${msg}`)
})

client.on('error', (error) => {
    console.error(error)
    client.close()
})

const str = 'hello'
client.send(str, 0, str.length, 41234, '224.0.0.114', (err) => {
    if (err) console.error(err)
    else console.log('Message sent')
    client.close()
})