import os from 'os'

console.log('os.EOL', os.EOL)
// 获取cpu的架构
console.log(os.arch())
// 获取当前系统的cpu个数
console.log(os.availableParallelism())
console.log('cpus', os.cpus())

console.log(os.tmpdir())
console.log(os.endianness())
console.log(os.hostname())
console.log(os.type())
console.log(os.platform())
console.log(os.release())
console.log(os.uptime())
console.log(os.loadavg())
console.log(os.freemem())
console.log(os.networkInterfaces())
console.log(os.userInfo())
console.log(os.homedir())
console.log(process.env)