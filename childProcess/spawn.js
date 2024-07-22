/**
 * child_process.spawn 是nodejs中用于创建新进程的一个函数，适用于需要和子进程进行持续通信
 * 或者处理大量数据的场景
 * 
 * 适用场景：
 * 1：处理大量数据，例如处理大文件内容时
 * 2：持续交互：例如父子进程需要持续的进行信息交互
 * 3：后台任务：例如启动服务器或者其它长期运行的进程
 * 4：并行处理：启动多个子进程来处理并行任务
 */
const { spawn } = require('child_process')
function demo1() {
    const ls = spawn('cmd', ['/c', 'dir'])

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
    })

    ls.stderr.on('data', (data) => {
        console.log(`stdout: ${data}`)
    })

    // 当子进程的所有stdio流都被终止时触发
    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    })

    // 当子进程无法被生成或杀死时触发
    ls.on('error', (error) => {
        console.error('Failed to start subprocess')
        console.error(error)
    })

    // 当子进程退出时触发
    ls.on('exit', (data) => {
        console.log(`close ${data}`)
    })

    // 当子进程和父进程之间的IPC关闭时触发
    ls.on('disconnect', (data) => {
        console.log(`data ${data}`)
    })
}

function demo2() {
    const ping = spawn('ping', ['-c', '4', 'google.com'])

    ping.stdout.on('data', (data) => {
        console.log(`ping.stdout: ${data}`)
    })

    ping.stderr.on('data', (error) => {
        console.error(`ping.stderr: ${error}`)
    })

    ping.on('close', (code) => {
        console.log(`ping close: ${code}`)
    })

}

demo2()
// demo1()
