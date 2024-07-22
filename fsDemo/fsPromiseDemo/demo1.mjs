import * as fsp from 'fs/promises'
import * as fs from 'fs'
import path from 'path'

let fileHandle = null

try {
    const filePath = path.resolve('../../input.txt')
    console.log('filePath', filePath)
    fileHandle = await fsp.open(filePath)
} catch(e) {
    console.error(e)
} finally {
    await fileHandle?.close()
    console.log('文件关闭成功')
}
