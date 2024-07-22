const async_hooks = require('async_hooks')
const { fd } = process.stdout
const fs = require('fs')
const store = new Map()

class MyAsyncLocalStorge {
    constructor() {
        this.hooks = async_hooks.createHook({
            init: this.init.bind(this),
            destroy: this.destroy.bind(this)
        })
        this.hooks.enable()
    }

    init(asyncId, type, triggerAsyncId) {
        fs.writeSync(fd, `asyncId: ${asyncId}  type: ${type} triggerAsyncId: ${triggerAsyncId} \n`)
        if (store.has(triggerAsyncId)) {
            store.set(asyncId, store.get(triggerAsyncId))
        }
    }

    destroy(asyncId) {
        store.delete(asyncId)
    }

    run(storeValue, cb) {
        const eid = async_hooks.executionAsyncId()
        fs.writeSync(fd, `eid: ${eid} \n`)
        store.set(eid, storeValue)
        try {
            return cb()
        } finally {
            store.delete(eid)
        }
    }

    getStore() {
        const eid = async_hooks.executionAsyncId()
        return store.get(eid)
    }
}

const asyncLS = new MyAsyncLocalStorge()

asyncLS.run({id: 1}, () => {

    console.log(asyncLS.getStore())

    setImmediate(() => {
        fs.writeSync(fd, JSON.stringify(asyncLS.getStore()))
    })

    process.nextTick(() => {
        fs.writeSync(fd, JSON.stringify(asyncLS.getStore()))
    })

    setTimeout(() => {
        fs.writeSync(fd, JSON.stringify(asyncLS.getStore()))
    })
})

setTimeout(() => {
    fs.writeSync(fd, JSON.stringify(asyncLS.getStore() || {}))
})