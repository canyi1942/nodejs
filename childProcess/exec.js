/**
 * 适用于一次性获取完整输出的任务，而不是流式数据，凡是在命令行中可执行的命令，都可以调用exec函数进行调用
 * 2: 缓冲区是有大小限制的，默认是1MB，超出此大小，可能会报错，可通过maxBuffer进行修改
 * 3: 安全性：不要直接执行用户的输入参数，因为exec会直接执行命令，可能会有未知的风险
 */
const { exec } = require('child_process')

function execDemo() {
    exec('ipconfig', {
        cwd: process.cwd(),
        env: process.env,
        encoding: 'buffer',
        maxBuffer: 1024 * 1024 * 10
    }, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`stdout: ${stdout.toString('utf-8')}`)
            console.log(`stderr: ${stderr.toString('utf-8')}`)
        }
    })
}

function demo2() {
    exec('node -v', {
        cwd: process.cwd(),
        env: process.env,
        encoding: 'buffer'
    }, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`stdout: ${stdout}`)
            console.log(`stderr: ${stderr}`)
        }
    })
}

function demo3() {
    exec('node ../demo.mjs', {
        cwd: process.cwd(),
        env: process.env,
        encoding: 'buffer'
    }, (error, stdout, stderr) => {
        if (error) {
            console.error(error)
            return null
        }
        console.log(`stdout: ${stdout.toString('utf-8')}`)
        console.error(`stderr: ${stderr}`)
    })
}

// demo3()
// demo2()
execDemo()