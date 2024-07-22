import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./1.txt', 'w+')
    const bufs = [
        Buffer.from('i am buffer1'),
        Buffer.from('i am buffer2')
    ]
    const {bytesWritten, buffers} = await fileHandle.writev(bufs, 100)
    console.log('bytesWritten', bytesWritten)
    console.log('buffers', buffers.join('').toString())
} catch (error) {
    console.error(error)
} finally {
    fileHandle?.close()
    console.log('文件关闭成功')
}