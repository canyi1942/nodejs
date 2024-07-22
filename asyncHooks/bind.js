/**
 * AsyncLocalStorage.bind 是一个静态函数，用于将函数绑定到异步资源的上下文中，因此在该函数中可以访问异步资源的store
 * 使用场景：在run之外获取store
 */
const { AsyncLocalStorage } = require('async_hooks')

const asyncLocalStorage = new AsyncLocalStorage()



const logStoreOfOut = asyncLocalStorage.run({id: 1}, () => {
    console.log(asyncLocalStorage.getStore())

    function logStore() {
        console.log(`logStore: ${JSON.stringify(asyncLocalStorage.getStore())}`)
    }

    const boundLogStore = AsyncLocalStorage.bind(logStore)

    return boundLogStore
})
logStoreOfOut()

console.log(asyncLocalStorage.getStore())