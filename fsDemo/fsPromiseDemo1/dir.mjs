import * as fsp from 'fs/promises'

async function createDir() {
    try {
        await fsp.mkdir('./test2/text3/1.txt', {
            recursive: true,
            mode: 0o777
        })
        console.log('文件创建成功')
    } catch (error) {
        console.error(error)
    }
}

async function openDir() {
    try {
        const dirs = await fsp.opendir('./test2', {
            encoding: 'utf-8',
            recursive: true,
            bufferSize: 32
        })
        for await (const dir of dirs) {
            console.log(dir)
        }
    } catch (error) {
        
    }
}

async function readdir() {
    try {
        const dirs = await fsp.readdir('./test2', {
            encoding: 'utf-8',
            recursive: true,
            withFileTypes: true
        })
        for (const dir of dirs) {
            console.log(dir)
        }
    } catch (error) {
        console.error(error)
    }
}

async function rmdir() {
    await fsp.rmdir('./test', {
        maxRetries: 2,
        retryDelay: 100,
        recursive: true
    })
    console.log('文件夹删除成功')
}

async function rm() {
    await fsp.rm('./test2', {
        maxRetries: 2,
        retryDelay: 100,
        recursive: true,
        force: true
    })
    console.log('删除文件夹成功')
}

// createDir()
// openDir()
// readdir()
// rmdir()
rm()