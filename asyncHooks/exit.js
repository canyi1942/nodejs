/**
 * 功能：als.exit 在其的参数函数中，无法获取异步资源的store，值是undefined；
 * 使用场景：
 */
const { AsyncLocalStorage } = require('async_hooks')

const als = new AsyncLocalStorage()

als.run({id: 1}, () => {
    console.log(als.getStore())
    als.exit(() => {
        console.log(`Inside exit: ${als.getStore()}`)
    })
    console.log(`after exit: ${JSON.stringify(als.getStore())}`)
})