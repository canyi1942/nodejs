import * as fsp from 'fs/promises'

try {
    await fsp.mkdtemp('tempX-')
    console.log('mkdtemp')
} catch (error) {
    console.error(error)
}