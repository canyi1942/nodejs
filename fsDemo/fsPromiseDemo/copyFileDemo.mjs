import * as fsp from 'fs/promises'

try {
    await fsp.copyFile('./1.txt', './2.txt')
    console.log('复制成功')
} catch (error) {
    console.error(error)
} finally {

}