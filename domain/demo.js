/**
 * domain 模块提供了一种处理未捕获的异常和处理多个I/O操作的上下文方式
 * 它使得开发者可以将多个I/O操作绑定到同一个域上，以便更容易的处理这些操作中的错误
 * 
 * 虽然domain模块是nodejs在V0.8中引入的，但是目前V22版本的api上已经标识为废弃的状态，
 * 所以不要使用此模块，可以使用try catch,async_hooks等功能处理异常
 */
const d = require('domain').create()

function demo() {
    d.on('error', (error) => {
        console.error('domain error', error)
    })

    d.run(() => {
        throw new Error('error')
    })
}

demo()