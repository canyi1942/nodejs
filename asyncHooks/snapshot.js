/**
 * snapshot 静态方法：用于锁定run存储的value
 * 1：在其它run上下文，也是返回定义时存储的value
 * 2：可以在run上下文之外的地方调用，返回的是定义时存储的value
 */

const { AsyncLocalStorage } = require('async_hooks')
const { fd } = process.stdout
const fs = require('fs')
const asyncLocalStorage = new AsyncLocalStorage()

const snapshot = asyncLocalStorage.run({id: 1}, () => {
    fs.writeSync(fd, 'the first asyncLocalStorage: ' + JSON.stringify(asyncLocalStorage.getStore()) + '\n')

    return AsyncLocalStorage.snapshot()
})

asyncLocalStorage.run({id: 2}, () => {
    console.log('the second asyncLocalStorage: ' + JSON.stringify(asyncLocalStorage.getStore()))
    snapshot(() => {
        console.log('call snapshot: ' + JSON.stringify(asyncLocalStorage.getStore()))
    })
})

snapshot(() => {
    console.log('call snapshot outter : ' + JSON.stringify(asyncLocalStorage.getStore()))
})