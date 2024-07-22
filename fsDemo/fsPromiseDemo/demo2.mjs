import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./1.txt', 'w')
    await fileHandle.writeFile('hello fs/promises\n')
    await fileHandle.writeFile('hello fs/promises')
    console.log('数据已被成功写入')
} catch (error) {
    console.error(error)
} finally {
    await fileHandle?.close()
    console.log('文件关闭成功')
}