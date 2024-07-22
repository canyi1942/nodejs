
let count = 1

function setNextTick() {
    const start = process.hrtime()
    count++
    process.nextTick(() => {
        console.log('next tick callback')
        if (count <= 2) {
            console
            setNextTick()
        }
        const end = process.hrtime(start)
        console.log(end[0] * 1000 + end[1] / 1000000)
    })
}


setTimeout(() => {
    console.log('settimeout')
}, 3000);

process.on('exit', () => {
    console.log('nodejs 进程退出')
})
setNextTick()

console.log('nexttick was set')

console.log(typeof(window))