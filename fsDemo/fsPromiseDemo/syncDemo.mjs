import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./1.txt', 'w')
    fileHandle.write('艰难苦恨繁霜鬓')
    fileHandle.sync()
    console.log('写入成功')
} catch (error) {
    console.error(error)
} finally {
    fileHandle?.close()
}