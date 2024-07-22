import * as fsp from 'fs/promises'

async function writeFile() {
    try {
        await fsp.writeFile('./2.txt', 'hello write file \n', {
            encoding: 'utf-8',
            mode: 0o777,
            flag: 'a',
            flush: true
        })
        console.log('文件写入成功')
    } catch (error) {
        console.error(error)
    }
}

async function appendFile() {
    try {
        await fsp.appendFile('./2.txt', 'hello append file \n', {
            encoding: 'utf-8',
            mode: 0o777,
            flag: 'a',
            flush: true
        })
        console.log('文件追加成功')
    } catch (error) {
        console.log(error)
    }
}

async function readFile() {
    try {
        const str = await fsp.readFile('./2.txt', {
            encoding: 'utf-8',
            flag: 'r'
        })
        console.log(str)
    } catch (error) {
        console.error(error)
    }
}

writeFile()
appendFile()
readFile()

