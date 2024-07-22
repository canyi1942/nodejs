import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./1.txt', 'w')
    await fileHandle.appendFile('fsp appendFile')
    console.log('追加写入成功')
} catch (error) {
    console.error(error)
} finally {
    await fileHandle?.close()
    console.log('文件关闭成功')
}