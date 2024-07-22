import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./fdDemo.mjs', 'r')
    const buffer = Buffer.alloc(1024)
    const {bytesRead} = await fileHandle.read(buffer, 0, buffer.length, 0)
    console.log('bytesRead', bytesRead)
    console.log(buffer.toString())

} catch (error) {
    console.log(error)
} finally {
    fileHandle?.close()
    console.log('文件关闭成功')
}