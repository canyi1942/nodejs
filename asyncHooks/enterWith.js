/**
 * asyncLocalStorage.enterWith:修改run存储的数据，在这之后的getStore获取的数据都是修改后的
 */
const { AsyncLocalStorage } = require('async_hooks')

const asyncLocalStorage = new AsyncLocalStorage()

asyncLocalStorage.run({id: 1}, () => {
    console.log(asyncLocalStorage.getStore())

    asyncLocalStorage.enterWith({id: 2})

    console.log(asyncLocalStorage.getStore())

    process.nextTick(() => {
        console.log(asyncLocalStorage.getStore())
    })
})

