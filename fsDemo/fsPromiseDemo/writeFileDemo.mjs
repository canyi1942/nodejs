import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./1.txt', 'w')
    await fileHandle.writeFile('hi writeFile Demo')
    console.log('文件写入成功')
} catch (error) {
    console.error(error)
} finally {
    fileHandle?.close()
    console.log('文件关闭成功')
}