const path = require('path')

const currentPath = path.resolve('./demo.js')
console.log('currentPath', currentPath)

console.log('dirname', path.dirname(currentPath))

console.log('basename', path.basename(currentPath))

console.log('extname', path.extname(currentPath))

console.log('join', path.join(__dirname, path.basename(__filename)))

console.log('normalize', path.normalize(currentPath + path.sep + '..'))

// console.log('normalize ', path.normalize('/test/test2/test3/..'))

// console.log('join', path.join('test', 'test2', 'test3'))

// console.log('resolve', path.resolve('./demo.mjs'))

// console.log('extname', path.extname(path.resolve('./demo.mjs')))