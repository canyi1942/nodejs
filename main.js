const greet = require('./hello')

greet('weipeng')

let obj = {
    id: 'hello',
    exports: {}
}

let exportCopy = obj.exports

exportCopy = 1

console.log(obj.exports)