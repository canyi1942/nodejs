/**
 * 1: 提供异步事件驱动机制，用户可以使用该模块进行事件注册、监听
 * 2：nodejs中的众多模块都是基于此模块实现的驱动机制
 * 3：从emit触发事件，到监听函数执行，此过程是同步执行的
 * 4：error事件是特殊的存在，如果emit('error'),必须存在至少一个的监听函数，否则就会报错，
 *    同时nodejs进程也会退出
 * 5: 监听函数中的this：普通函数为emitter,箭头函数遵从自身规则
 * 6：内置监听器：newListener,removeListener，在新注册和删除事件时，会触发这两个监听器
 * 7：
 */
const EventEmitter = require('events')


/**
 * 定义类并继承EventEmitter，并实现监听器和触发事件
 * 
 * 从此例中可发现emit触发事件，到监听函数执行，是同步执行的
 */
function demo1() {
    class MyEventEmitter extends EventEmitter {}

    const myEventEmitter = new MyEventEmitter()

    myEventEmitter.on('events', function(...args){
        console.log(args)
    })

    console.log('emit events before')
    myEventEmitter.emit('events', 'hello', 'eventemitter')
    console.log('emit events after')
}

/**
 * 监听函数中的this和绑定监听事件的对象是同一个对象，
 * 
 * 由于箭头函数的特殊性，函数内部的this指向外部作用域的this，不和绑定事件的对象相等
 */
function theCallbackOfThis() {
    const eventEmitter = new EventEmitter()

    eventEmitter.on('event', function(...args) {
        console.log(args)
        console.log(this)
        console.log(this === eventEmitter)
    })

    eventEmitter.on('event', () => {
        console.log(this)
        console.log(this === global)

    })

    eventEmitter.emit('event', 'hello', 'world')
}

/**
 * error事件是比较特殊的存在，其如果没有至少一个的监听函数，那么就会抛出错误，打印堆栈信息，然后nodejs退出
 * 
 * 其它事件，如果没有监听函数，则不会报错
 */
function listenError() {
    const eventEmitter = new EventEmitter()

    eventEmitter.on('error', (err) => {
        console.error(err)
    })

    eventEmitter.emit('error', 'some wrong')
}

/**
 * EventEmitter 内置了newListener和removeListener两个事件，
 *              当添加事件监听器触发newListener,移除监听器时，触发removeListener
 */
function listennerOfEmitter() {
    const emitter = new EventEmitter()

    emitter.on('newListener', (event, listener) => {
        console.log(`event : ${event}`)
    })

    emitter.on('removeListener', (event, listener) => {
        console.log(`event: ${event}`)
    })

    emitter.on('event', (...args) => {
        console.log(args)
    })

    emitter.emit('event', 'hello world')

    emitter.removeAllListeners('event')

}

listennerOfEmitter()
// listenError()
// demo2()
// demo1()
