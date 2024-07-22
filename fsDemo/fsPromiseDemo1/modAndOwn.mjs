import * as fsp from 'fs/promises'

/**
 * 修改文件的权限，文件一般都会有读、写、执行，三种权限；
 * chmode(path, mod),mod以8进制进行表示，三种权限进行相加得到和：读是1，写是2，执行是4
 * 不过需要注意的是该操作仅对linux/unix生效，window不支持
 */
async function changeMode() {

    try {
        await fsp.chmod('./1.txt', 0o777)
        console.log('修改文件权限成功')
    } catch (error) {
        console.error(error)
    }
}

/**
 * 修改文件的所有者
 * 在window系统下不起作用
 */
async function changeOwner() {
    try {
       await fsp.chown('./1.txt', 1, 1)
        console.log('修改文件所有者成功')
    } catch (error) {
        console.error(error)
    }
}

changeMode()
changeOwner()


