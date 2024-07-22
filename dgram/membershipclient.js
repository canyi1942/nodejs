const dgram = require('dgram')

const client = dgram.createSocket('udp4')

client.on('message', (msg, rinfo) => {
    console.log(`receive message from ${rinfo.address}: ${rinfo.port}--${msg}`)
})

const str = 'hello membership'
client.send(str, 0, str.length, 41234, '224.0.0.114', (err) => {
    if (err) console.error(err)
    else console.log('message sent')
    client.close()
})