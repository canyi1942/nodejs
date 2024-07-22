/**
 * 不可变的原始二进制数据
 */
const { Blob } = require('buffer')

const blob = new Blob(['hello'], {
    endings: 'native',
    type: 'text/plain'
})
 
console.log(blob)

const bufPro = blob.arrayBuffer()
bufPro.then((value) => {
    console.log(value)
})

console.log(blob.size)

const subBlob = blob.slice(0,2)
console.log(subBlob)

const rs = require('stream').Readable.from(blob.stream())
rs.on('data', (dt) => {
    console.log(dt)
})
rs.on('end', (dt) => {
    console.log('dt', dt)
    console.log('end')
})

blob.text().then((value) => {
    console.log(value)
})

console.log(blob.type)
