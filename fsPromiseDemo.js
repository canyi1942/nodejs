const fs = require('fs/promises')

const dir = process.cwd()
console.log('dir', dir)
console.log('__dirname', __dirname)

const fileHandle = fs.open('./input.txt')

fileHandle.on('close', (evt) => {
    console.log('file close', evt)
})

fileHandle.close()
