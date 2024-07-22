import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('1.txt', 'a')
    await fileHandle.write('支付成功', 80, 'utf-8')
    await fileHandle.datasync()
    console.log('已将数据强制写入磁盘')
} catch (error) {
    console.log(error)
} finally {
    fileHandle?.close()
}