const events = require('events')

const eventEmitter = new events.EventEmitter()

eventEmitter.on('connect', () => {
    console.log('connect')
    eventEmitter.emit('receive', 'weipeng', 'ceshi')
})

eventEmitter.on('receive', (...args) => {
    console.log('receive  data', args)
})

function useAddListenerFunc(...args) {
    console.log('addlistener', args)
}
eventEmitter.addListener('receive', useAddListenerFunc)

const evts = eventEmitter.eventNames()
console.log('当前注册的事件数', evts)

const maxListener = eventEmitter.getMaxListeners()
console.log('maxlistener', maxListener)

eventEmitter.setMaxListeners(100)
console.log('手工设置的可监听的最大数', eventEmitter.getMaxListeners())

const listenerCount = eventEmitter.listenerCount('receive')
console.log('receive 的观察者有：', listenerCount)

const receiveOfListener = eventEmitter.listeners('receive')
console.log('receiveOfListener:', receiveOfListener)
receiveOfListener.forEach((func) => {
    func(1)
})

eventEmitter.off('receive', useAddListenerFunc)
console.log('receive 的监听函数个数：', eventEmitter.listenerCount('receive'))


eventEmitter.once('receive', (...args) => {
    console.log('使用once注册监听的函数', args)
})

console.log('maxListener', eventEmitter.maxListener)

eventEmitter.emit('connect')

console.log('程序执行完毕')
console.log('receive监听的函数', eventEmitter.listenerCount('receive'))