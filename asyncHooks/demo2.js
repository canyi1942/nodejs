const asyncHooks = require('async_hooks')
const fs = require('fs')
const net = require('net')
const { fd } = process.stdout

let indent = 0

asyncHooks.createHook({
    init(asyncId, type, triggerAsyncId) {
        const eid = asyncHooks.executionAsyncId()
        const tid = asyncHooks.triggerAsyncId()
        const indentStr = ' '.repeat(indent)
        fs.writeSync(fd, ` type: ${type} asyncId: ${asyncId} -- triggerAsyncId: ${triggerAsyncId} 
        executionAsyncId(): ${eid}   triggerAsyncId(): ${tid}\n`)
    },
    before(asyncId) {
        const indentStr = ' '.repeat(indent)
        fs.writeSync(fd, `${indentStr} before: ${asyncId} \n`)
        indent += 2
    },
    after(asyncId) {
        indent -= 2
        const indentStr = ' '.repeat(indent)
        fs.writeSync(fd, `${indentStr} after: ${asyncId} \n`)
    },
    destroy(asyncId) {
        const indentStr = ' '.repeat(indent)
        fs.writeSync(fd, `${indentStr} destory: ${asyncId} \n`)
    }
}).enable()

// net.createServer(() => {}).listen(8080, () => {
//     // console.log('>>>', asyncHooks.executionAsyncId())
// })
// process.nextTick(() => {

// })

function test() {
    setTimeout(() => {
        setTimeout(() => {
        
        })  
    })
}
setTimeout(() => {
    setTimeout(() => {
        test()
    })
}, 1000);
