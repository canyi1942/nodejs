const { dirname, basename } = require('path')
const path = require('path')

// path.join([...paths])，将所有给定的paths，使用正确的分隔符连接起来，window平台\,unix平台/
const filePath = path.join(__dirname, 'input.txt')
console.log(filePath)

// path.resolve([...paths]),将给定的路径片段进行连接，并返回绝对路径；如果没有传入参数，则返回当前文件所在的路径
const absulutePath = path.resolve()
const absulutePath1 = path.resolve('./processDemo.js')
console.log(absulutePath, absulutePath1, __dirname)

// path.dirname，返回给定路径的最后一个分隔符前面的字符串；不保证路径的实际正确性
const dirName = path.dirname(filePath)
console.log('dirname', dirName)

// path.basename 返回路径的最后一部分
const baseName = path.basename(filePath)
console.info('basename', baseName)

// 返回给定路径的文件扩展名
const extension = path.extname(filePath)
console.log('extension', extension)

const pathInfo = path.parse(filePath)
console.log('pathinfo', pathInfo)

console.log(path.normalize('./fsDemo.js'))





