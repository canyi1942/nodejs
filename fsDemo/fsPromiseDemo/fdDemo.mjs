import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./1.txt', 'a')
    console.log('fileHandle fd', fileHandle.fd)
    console.log(fileHandle)
} catch (error) {
    console.log(error)
} finally {
    fileHandle?.close()
}