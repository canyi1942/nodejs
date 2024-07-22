const { Blob } = require('buffer')

const blob = new Blob(['hello there'])

const mc = new MessageChannel()

mc.port1.onmessage = (value) => {
    // console.log(value.data)
    value.data.arrayBuffer().then((dt) => {
        console.log(dt.toString('utf-8'))
        mc.port1.close()
    })
}

mc.port2.postMessage(blob)