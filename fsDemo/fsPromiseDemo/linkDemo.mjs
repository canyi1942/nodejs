import * as fsp from 'fs/promises'

let fileHandle = null

try {
    await fsp.link('./1.txt', './6.txt')
    fileHandle = await fsp.open('./1.txt')
    console.log(await fileHandle.stat())
    console.log('创建硬链接成功')
} catch (error) {
    console.error(error)
} finally {
    fileHandle?.close()
    console.log('文件关闭成功')
}