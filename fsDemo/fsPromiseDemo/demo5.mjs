import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./1.txt', 'r')
    const rs = fileHandle.createReadStream({
        encoding: 'utf-8',
        autoClose: true,
        emitClose: true,
        start: 0,
        end: 1024,
        highWaterMark: 10
    })
    rs.on('open', (dt) => {
        console.log('open', dt)
    })
    rs.on('ready', (dt) => {
        console.log('ready', dt)
    })
    rs.on('data', (dt) => {
        console.log('data == ', dt.toString())
    })
    rs.on('end', () => {
        console.log('end')
    })

    rs.on('close', () => {
        console.log('close')
        closeFileHandle()
    })
    rs.on('error', (error) => {
        console.log(error)
        closeFileHandle()
    })

} catch (error) {
    console.error(error)
} finally {

}

async function closeFileHandle() {
    await fileHandle?.close()
    console.log('文件关闭成功')
}