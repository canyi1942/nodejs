import * as fs from 'fs'

function readAndWriteFile() {
    fs.writeFileSync('./1.txt', 'hello fs sync', {
        encoding: 'utf-8',
        mode: 0o777,
        flag: 'w',
        flush: true
    })
    console.log('写入成功')

    const str = fs.readFileSync('./1.txt', {
        encoding: 'utf-8',
        flag: 'r'
    })

    console.log(str)
}

fs.

readAndWriteFile()