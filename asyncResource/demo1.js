const { AsyncResource, executionAsyncId } = require('async_hooks')

class MyAsyncResource extends AsyncResource {
    constructor() {
        super('MyAsyncResource')
    }

    asyncOperation(callback) {
        this.runInAsyncScope(callback)
    }
}

const myAsyncResource = new MyAsyncResource()

function logWithAsyncId(source) {
    console.log(`${source} asyncId:`, executionAsyncId(),
    'triggerAsyncId:', myAsyncResource.triggerAsyncId())
}

myAsyncResource.asyncOperation(() => {
    logWithAsyncId('in asyncResource')
})

logWithAsyncId('outter asyncResource')