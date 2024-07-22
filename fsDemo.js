const fs = require('fs')

console.log('下面是读取文件的代码')
fs.readFile('./hello.js', 'utf-8', (error, data) => {
    if (error) {
        console.error(error)
    } else {
        console.log(data)
        fileData = data
        fs.writeFile('test.js', fileData, (error) => {
            console.log(error)
        })
    }
})

console.log('读取文件的代码执行完毕')

/**
 * 读取图片：读取到的内容是buffer
 */
let fileData = ''
fs.readFile('./1.jpg', (error, data) => {
    if (error) {
        console.log(error)
    } else {
        console.log(data)
        // console.log(data.toString('utf-8'))
    }
})

const a = 'A'
const ab = Buffer.from(a, 'utf-8')
console.log(ab)

const abStr = ab.toString('utf-8')
console.log(abStr)

// 除了上述异步读取文件外，还有同步读取的方法
// fs.readFileSync(file, 'utf-8', callback)

/**
 * 文件写入
 */
const str = 'hello nodejs'
fs.writeFile('test.js', str, (error) => {
    console.log(error)
})

// 同步写入
fs.writeFileSync('./test.txt', 'hello txt', (error) => {
    console.log(error)
})

/**
 * 获取文件的相关信息
 */
fs.stat('./test.js', (error, stat) => {
    if (error) {
        console.log(error)
    } else {
        console.log(stat)
        console.log('isFile', stat.isFile())
        console.log('isDirectory', stat.isDirectory())
        if (stat.isFile()) {
            console.log('stat.size', stat.size)
            console.log('stat.ctime', stat.ctime)
            console.log('stat.birthtime', stat.birthtime)
        }
    }
})
