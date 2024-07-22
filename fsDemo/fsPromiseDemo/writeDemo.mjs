import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./1.txt', 'w+')
    const buf = Buffer.from('hello world write demo', 'utf-8')
    await fileHandle.write(buf, 0, buf.length, 10)
    console.log('fileHandle write')
} catch (error) {
    console.error(error)
} finally {
    fileHandle?.close()
    console.log('文件关闭成功')
}