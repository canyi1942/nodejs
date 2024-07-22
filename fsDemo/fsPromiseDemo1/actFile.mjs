import * as fsp from 'fs/promises'

async function unlinkFile() {
    try {
        await fsp.unlink('./4.txt')
        console.log('文件删除成功')
    } catch (error) {
        console.error(error)
    }
}

async function removeFile() {
    try {
        await fsp.rm('./2.txt', {
            force: true,
            retryDelay: 100,
            recursive: true,
            maxRetries: 2
        })
        console.log('删除成功')
    } catch (error) {
        console.error(error)
    }
}

async function rmFile() {
    try {
        await fsp.rm('../fsPromiseDemo2', {
            force: false,
            maxRetries: 2,
            retryDelay: 100,
            recursive: true
        })
        console.log('删除成功')
    } catch (error) {
        console.error(error)
        
    }
}



async function renameFile() {
    try {
        await fsp.rename('./3.txt', './4.txt')
        console.log('rename file success')
    } catch (error) {
        console.error(error)
    }
}

async function copyFile() {
    try {
        await fsp.copyFile('./2.txt', './3.txt')
        console.log('copy file success')
    } catch (error) {
        console.error(error)
    }
}


async function cpFile() {
    try {
        await fsp.cp('../fsPromiseDemo1', '../fsPromiseDemo2', {
            dereference: true,
            errorOnExist: true,
            filter: (src, dest) => {
                console.log(src, dest)
                if (src.endsWith('txt')) {
                    return false
                }
                return true
            },
            force: true,
            preserveTimestamps: true,
            recursive: true,
            verbatimSymlinks: false
        })
        console.log('复制文件夹成功')
    } catch (error) {
        console.error(error)
    }
}

async function createFile() {
    try {
        await fsp.writeFile('./2.txt', '')
        console.log('create file success')
    } catch (error) {
        console.error(error)
    }
}

async function exitsFile() {
    try {
        await fsp.access('./1.txt')
        console.log('文件存在')
    } catch (error) {
        console.log('文件不存在')  
    }
}

async function stat() {
    try {
        const sts = await fsp.stat('./1.txt')
        console.log(sts)
    } catch (error) {
        console.error(error)
    }
}



// exitsFile()
// stat()
// await createFile()
// await copyFile()
// await renameFile()
// unlinkFile()
// removeFile()

// cpFile()
rmFile()