/**
 * 全局变量：
 * 1：定义在最外层的变量，不过在nodejs中，是无法定义在最外层的，因为每个文件都是一个模块
 * 2：全局变量的属性
 * 3：未定义直接使用的变量
 */

// 输出正在执行的脚本的名称。它将输出文件的绝对路径，文件名不一定和用户定义的一致，在node
// 中是一样的
console.log(__filename)
// 输出正在执行的脚步的路径
console.log(__dirname)

console.info('console.info')

// 输出当前对象的结构
console.dir(global)

console.time()

console.timeEnd()

global.process.on('exit', (args) => {
    console.info(args, 'process exit ')

    // 永远都不会执行
    setTimeout(() => {
        console.log('settime')
    }, 0);

    // 永远都不会执行
    setImmediate(() => {
        console.log('set immediate')
    })
})

/**
 * process.stdout用法
 */

// cork 和uncork配合，将信息一次性写入到标注流中，可节约时间，避免反复写入 
process.stdout.cork()

process.stdout.write('stout.write\n')
process.stdout.write('stout.write\n')
// process.stdout.end('stdout.end\n')
process.stdout.write(String(process.stdout.writable))

const fs = require('fs')

const rs = fs.createReadStream('./hello.js')

rs.pipe(process.stdout)
rs.unpipe(process.stdout)

process.stdout.write('i \n')
process.stdout.write('am \n')
process.stdout.write('man')

process.stdout.write(process.argv + '\n')

process.argv.forEach((i) => {
    process.stdout.write(i)
})


process.stdout.uncork()


process.stderr.write('stderr')

console.dir(process.stderr)

process.stdin.setEncoding('utf-8')

process.stdin.on('data', (data) => {
    process.stdout.write(data)
})

process.stdin.on('end', () => {
    console.log('end')
})