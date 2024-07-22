import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('fdDemo.mjs', 'r')
    const buffers = [Buffer.alloc(10), Buffer.alloc(10)]
    const {bytesRead} = await fileHandle.readv(buffers, 0)
    console.log(bytesRead)
    for (const [i, buf] of buffers.entries()) {
        console.log(i, buf.toString())
    }
} catch (error) {
    console.log(error)
} finally {
    fileHandle?.close()
}