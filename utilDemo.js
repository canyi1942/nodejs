const util = require('util')

// 接受一个async或返回微promise的函数，返回一个遵循错误优先的回调函数，即以(error, value)的函数
async function fn() {
    process.stdout.write('hello\n')
    return 'callbackify\n'
}
const callbackFunc = util.callbackify(fn)

callbackFunc((error, value) => {
    if(error) throw error
    console.log(value)
})

async function fn1() {
    return Promise.reject(1)
}
const callbackFunc1 = util.callbackify(fn1)
callbackFunc1((error, value) => {
    if (error) {
        console.error('console.error ', error)
    } else {
        console.log('console.log ', value)
    }
})

const debuglog = util.debuglog('test')
debuglog('util.debuglog, test')

const debuglog1 = util.debuglog('product')
debuglog1('util.debuglog, product')

const debuglog2 = util.debuglog('')
debuglog2('utildebuglog')

const fs = require('fs')
const readFile = util.promisify(fs.readFile)

async function read() {
    const data = await readFile('./input.txt', 'utf-8')
    console.log(data)
    // process.stdout.write('async read file, {data}', data)
}

read()

const obj = {name: 'weipeng', test: {age: 10}}
const str = util.inspect(obj)
console.log('util.inspect', str)
console.log('str.len', str.length)
console.log('obj', obj)


