import * as fsp from 'fs/promises'

/**
 * 使用mkdir创建目录，当recursive为true时，可以创建递归目录
 */
try {
    const dir = await fsp.mkdir('./test1/test1', {recursive: true})
    console.log(dir, '创建目录成功')
} catch (error) {
    console.error(error)
}