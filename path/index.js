const fs = require('fs')

fs.readFile('./demo.js', (error, data) => {
    if (error) {
        console.log(error)
        return 
    } else {
        console.log(data.toString())
    }
})