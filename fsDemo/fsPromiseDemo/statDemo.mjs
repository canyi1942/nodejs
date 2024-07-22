import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./fdDemo.mjs', 'r')
    const stat = await fileHandle.stat({bigint: false})
    console.log(stat)
} catch (error) {
    console.error(error)
} finally {
    fileHandle?.close()
}