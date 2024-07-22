const async_hooks = require('async_hooks')
const store = new Map()
const {fd} = process.stdout
const fs = require('fs')
class MyAsyncLocalStorge {
    constructor() {
        this.hooks = async_hooks.createHook({
            init: this.init.bind(this),
            destroy: this.destroy.bind(this)
        })
        this.hooks.enable()
    }

    init(asyncId, type, triggerAsyncId, resource) {
        if (store.has(triggerAsyncId)) {
            store.set(asyncId, store.get(triggerAsyncId))
        }
        fs.writeSync(fd, `asyncId:${asyncId} type: ${type} triggerAsyncId: ${triggerAsyncId} \n`)
    }

    destroy(asyncId) {
        if (store.has(asyncId)) {
            store.delete(asyncId)
        }
    }

    run(value, cb) {
        const asyncId = async_hooks.executionAsyncId()
        fs.writeSync(fd, `asyncId: ${asyncId}\n`)
        store.set(asyncId, value)
        return cb()
    }

    getStore() {
        const asyncId = async_hooks.executionAsyncId()
        return store.get(asyncId)
    }
}

const mals = new MyAsyncLocalStorge()

mals.run({id: 1}, () => {
    setTimeout(() => {
        fs.writeSync(fd, JSON.stringify(mals.getStore()))
    })

    setImmediate(() => {
        fs.writeSync(fd, JSON.stringify(mals.getStore()))
    })

    process.nextTick(() => {
        fs.writeSync(fd, JSON.stringify(mals.getStore()))
    })

    fs.writeSync(fd, JSON.stringify(mals.getStore()))
})