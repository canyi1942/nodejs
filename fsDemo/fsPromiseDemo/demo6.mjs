import * as fsp from 'fs/promises'

let fileHandle = null

try {
    fileHandle = await fsp.open('./1.json', 'w')
    const ws = fileHandle.createWriteStream({
        encoding: 'utf-8',
        autoClose: true,
        emitClose: true,
        start: 20
    })
    ws.write('君不见高堂明镜被白发', 'utf-8', (error) => {
        console.log(error || '写入成功')
    })
    ws.end()
    ws.on('close', () => {
        console.log('close')
        closeFileHandle()
    })
    ws.on('error', (error) => {
        console.log(error)
        closeFileHandle()
    })
    ws.on('finish', () => {
        console.log('finish')
    })
} catch (error) {
    console.log(error)
}

function closeFileHandle() {
    fileHandle?.close()
    console.log('close fileHandle')
}