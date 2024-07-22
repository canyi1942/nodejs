import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./1.txt', 'r+')
    const newAtime = new Date('2023-05-06 15:46:00')
    const newMtime = new Date('2023-05-04 19:44:25')
    await fileHandle.utimes(newAtime, newMtime)
    console.log('修改文件得访问时间和修改时间')
} catch (error) {
    console.error(error)
} finally {
    fileHandle?.close()
    console.log('文件关闭成功')
}