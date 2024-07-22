/**
 * 在子进程中执行文件，和exec不同，execFile可直接执行一个可执行文件和脚本，而不是通过shell运行命令，
 * 所以会更安全和高效
 * 
 * 第一个参数需要时可执行的，比如node、python等，也可以是**.exe **.bat等
 */
const { execFile } = require('child_process')

function demo1() {
    execFile('node', ['--version'], (error, stdout, stderr) => {
        if (error) {
            console.log(error)
            return
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
    })
}

function demo2() {
    execFile('convert', ['../1.jpg', '../11.png'], (error, stdout, stderr) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
    })
}

function demo3() {
    execFile('node', ['./exec.js'], (error, stdout, stderr) => {
        if (error) {
            console.error(error)
            return null
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
    })
}

function demo4() {
    execFile('npm', ['i'], (error, stdout, stderr) => {
        if (error) {
            console.error(error)
            return 
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
    })
}

function demo5() {
    const batFilePath = require('path').join(__dirname, 'childProcess', 'example.bat')

    execFile(batFilePath, (error, stdout, stderr) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
    })
}

demo5()
// demo4()
// demo3()
// demo2()
// demo1()

