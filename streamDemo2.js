const fs = require('fs')

let data = ''
const rs = fs.createReadStream('./input.txt')

rs.setEncoding('utf-8')

rs.on('data', (dt) => {
    console.log('dt', dt)
    data += dt
})

rs.on('end', () => {
    console.log('读完毕')
    console.log(data)
})

rs.on('error', (error) => {
    console.error('error', error)
})

rs.on('close', (dt) => {
    console.log('close', dt)
})

rs.on('open', (data) => {
    console.log('open', data)
})

let dt = ''
rs.on('readable', (data) => {
    while((dt = rs.read())) {
        console.log('readable', dt)
    }
})

// 
// 写流实例
// 

const ws = fs.createWriteStream('./input2.txt')
ws.write('www.runoob.com')
ws.end()

ws.on('finish', () => {
    console.log('写完毕')
})

ws.on('error', (error) => {
    console.log(error)
})

// 
// 管道流示例
// 

const rs2 = fs.createReadStream('./2.txt')
const ws2 = fs.createWriteStream('./3.txt')

rs2.pipe(ws2)

console.log('程序执行完毕')

// 
// 链式流
// 

const zlib = require('zlib')

fs.createReadStream('./3.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('./4.txt.gz'))

fs.createReadStream('./4.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('./5.txt'))
