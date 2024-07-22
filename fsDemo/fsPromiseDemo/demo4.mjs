import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./1.txt', 'r+')
    await fileHandle.chmod(0o333)
    console.log('文件权限更改完毕')
} catch (error) {
    console.error(error)
} finally {
    const pro = fileHandle?.close()
    pro.then((value) => {
        console.log('promise ', value)
    }).catch((error) => {
        console.log(error)
    })
}