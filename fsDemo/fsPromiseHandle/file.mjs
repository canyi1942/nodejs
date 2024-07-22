import * as fsp from 'fs/promises'
import { builtinModules } from 'module'

async function createFile() {
    let fileHandle = null
    try {
        fileHandle = await fsp.open('./2.txt', 'a', 0o777)
        console.log('文件创建成功')
    } catch (error) {
        console.error(error)
    } finally {
        fileHandle?.close()
    }
}
// appendFile 不一定不覆盖文件，需要mode设置为a
async function readAndWriteFile() {
    let fileHandleRead = null
    let fileHandleWrite = null
    try {
        fileHandleRead = await fsp.open('./1.txt', 'r', 0o777)
        fileHandleWrite = await fsp.open('./2.txt', 'a', 0o777)
        const str = await fileHandleRead.readFile('utf-8')
        await fileHandleWrite.appendFile(str, {
            encoding: 'utf-8'
        })
        await fileHandleWrite.writeFile(str, {
            encoding: 'utf-8'
        })
        
        console.log('写入成功')
    } catch (error) {
        console.error(error)
    } finally {
        fileHandleRead?.close()
        fileHandleWrite?.close()
    }
}

async function stream() {
    let fileHandle = await fsp.open('./1.txt', 'r', 0o777)
    let writeFileHandle = await fsp.open('./4.txt', 'w', 0o777)
    const rs = fileHandle.createReadStream({
        encoding: 'utf-8',
        autoClose: true,
        emitClose: true,
        highWaterMark: 1
    })

    const ws = writeFileHandle.createWriteStream({
        encoding: 'utf-8',
        autoClose: true,
        emitClose: true,
        highWaterMark: 1,
        flush: true
    })

    ws.on('finish', () => {
        console.log('finish')
        writeFileHandle.datasync()
        writeFileHandle.sync()
    })

    rs.on('data', (data) => {
        ws.write(data)
        console.log(data)
    })
    rs.on('error', (error) => {
        console.error(error)
    })
    rs.on('end', () => {
        console.log('end')
        fileHandle.close()
        writeFileHandle.close()
    })
}

async function readableWebStream() {
    const fileHandle = await fsp.open('./4.txt', 'r', 0o777)
    const readableWebStream = fileHandle.readableWebStream()
    let chunk = []
    let length = 0
    for await (const r of readableWebStream) {
        chunk.push(r)
        console.log(r.byteLength)
        length += r.byteLength
    }
    console.log('length', length)
    let position = 0
    const typeArray = new Uint8Array(length)
    console.log(typeArray)
    for (let i = 0; i < chunk.length; i++) {
        console.log(i, chunk[i])
        console.log('position', position)
        typeArray.set(chunk[i], position)
        console.log(typeArray, chunk[i])
        position += chunk[i].byteLength
    }
    const result = new TextDecoder('utf-8').decode(typeArray)
    console.log('result', result)
    // const reader = readableWebStream.getReader()
    // const bytes = await reader.read()
    // console.log(bytes.value)
}

async function readAndWriteBuffer() {
    const fileHandleRead = await fsp.open('./1.txt', 'r', 0o777)
    const fileHandleWrite = await fsp.open('./7.txt', 'w', 0o777)
    const buffer = Buffer.alloc(20)

    const str = await fileHandleRead.read(buffer, 0, buffer.length, 0)

    await fileHandleWrite.write(buffer)
    console.log(str, buffer)
    fileHandleRead.close()
    fileHandleWrite.close()
}

async function readAndWriteV() {
    const buf1 = Buffer.alloc(6)
    const buf2 = Buffer.alloc(10)

    const fileHandle = await fsp.open('./1.txt', 'r', 0o777)
    await fileHandle.readv([buf1, buf2])
    console.log(buf1, buf2)

    const fileHandleW = await fsp.open('./8.txt', 'w', 0o777)
    await fileHandleW.writev([buf2, buf1])
    fileHandle.close()
    fileHandleW.close()

}

// createFile()
// readAndWriteFile()
// stream()

// readableWebStream()
// readAndWriteBuffer()
readAndWriteV()