const {exec} = require('child_process')

// 获取当前js文件的绝对路径
console.log(__filename)
// 返回当前正在执行脚步的目录
console.log(__dirname)

process.on('exit', (num) => {
    console.log('进程退出时执行的函数', num)
})

// console.log(process.stdin)
// console.log(process.stdout)

process.stdout.write('i am stdout\n')

function stdin() {
    // process.stdin.setEncoding('utf-8')

    // console.log('please input some text')

    process.stdin.on('data', (data) => {
        console.log('you enter:', data.toString())
        process.exit()
    })
}

// stdin()

console.log(process.argv)
console.log(process.argv0)
console.log(process.execArgv)

console.log(process.execPath)


// console.log(process.env)

console.log(process.version)

console.log(process.versions)

// console.log(process.config)

// process.abort()

console.log(process.cwd())

process.chdir('../')
console.log(process.cwd())
process.chdir('./global')
console.log(__dirname,__filename)

function testChdir() {
    const paths = [
        '../os/',
        './util/'
    ]

    paths.forEach((path) => {
        process.chdir(path)
        exec('node demo.mjs', (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                return
            }
            console.log(stdout)
        })
        process.chdir('../')
    })
}

testChdir()