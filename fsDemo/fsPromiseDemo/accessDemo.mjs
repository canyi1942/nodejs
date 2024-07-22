import * as fsp from 'fs/promises'
import * as fs from 'fs'
try {
    await fsp.access('./1.txt1', fs.constants.F_OK)
    console.log('文件可以访问')
} catch (error) {
    console.error(error)
    console.log('文件不存在或者不可访问')
}