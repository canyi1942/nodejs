const { AsyncResource } = require('async_hooks')

const asyncResource = new AsyncResource('my_bind')

asyncResource.bind
// 写一个hello world
