import * as fsp from 'fs/promises'

try {
    const dirs = await fsp.opendir('./', {
        encoding: 'utf-8',
        recursive: true
    })
    console.log(await dirs.read())
    console.log(await dirs.read())
    console.log(await dirs.read())
    // for await (const dir of dirs) {
        // console.log(dir, dir.name)
    // }
    const iterator = dirs[Symbol.asyncIterator]()
    for await (const dirent of iterator) {
        console.log(dirent)
    }
    // const dirent = await iterator.next()
    // console.log(dirent)
    console.log(dirs.path)
} catch (error) {
    console.error(error)
}