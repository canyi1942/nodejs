const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')

const logEvents = async (message) => {
    const time = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const log = `${time} \t ${uuid()} \t ${message}`
    console.log(log)
    if (fs.existsSync(path.join(__dirname, 'logs'))) {
        // vscode配置有问题，无法打出感叹号
    } else {
        fs.mkdirSync(path.join(__dirname, 'logs'))
    }
    fs.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), log, (error) => {
        error &&　console.log(error)
    })
}

module.exports = logEvents