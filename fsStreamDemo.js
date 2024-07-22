const fs = require('fs')

const rs = fs.createReadStream('./test.txt', {
    encoding: 'utf-8',
    highWaterMark: 1024
})

let count = 0

rs.on('data', (data) => {
    count++
    console.log('第', count, '次获取到数据分片')
    console.log(data)
})

rs.on('end', () => {
    console.log('end')
})

rs.on('error', (error) => {
    console.log(error)
})

// 将流写入文件
const ws = fs.createWriteStream('test2.txt', 'utf-8')
ws.write('使用stream 写入内容 \n')
ws.write('这是第二行')
ws.end()
ws.on('finish', () => {
    console.log('写入流 end')
})

const ws2 = fs.createWriteStream('test3.txt')
ws2.write(Buffer.from('使用二进制写入内容 \n'))
ws2.write(Buffer.from('这是第二行'))
ws2.end()
ws2.on('close', () => {
    console.log('使用字节流写入完毕')
})

// 使用管道  

const rs3 = fs.createReadStream('./hello.js', {
    encoding: 'utf-8'
})
const ws3 = fs.createWriteStream('./test4.js')

rs3.pipe(ws3)

// fs.stat()