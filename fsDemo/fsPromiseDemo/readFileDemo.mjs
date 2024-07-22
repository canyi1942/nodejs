import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./fdDemo.mjs', 'r')
    const content = await fileHandle.readFile('utf-8')
    console.log(content)
} catch (error) {
    console.log(error)
} finally {
    fileHandle?.close()
}