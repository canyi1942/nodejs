import * as fsp from 'fs/promises'

const dirs = await fsp.opendir('./', {
    encoding: 'utf-8',
    recursive: true
})

const dir1 = await dirs.read()
console.log(dir1.name)
console.log('parentPath', dir1.parentPath)
console.log('isBlockDevice', dir1.isBlockDevice())
console.log('isCharacterDevice', dir1.isCharacterDevice())
console.log('isFIFO', dir1.isFIFO())
console.log('isSocket', dir1.isSocket())
console.log('isSymbolicLink', dir1.isSymbolicLink())
