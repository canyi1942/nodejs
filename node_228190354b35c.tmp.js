const fs = require('fs')



function setNextTick() {
    process.nextTick(() => {
        console.log('next tick callback')
        setNextTick()
    })
}

setNextTick()

console.log('nexttick was set')