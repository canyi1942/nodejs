/**
 * 1: Console是nodejs内置的一个模块，可以人为指定一个或者两个可写流
 * 2：console是Console的一个全局实力，其stdout,stderr已经被指定为process.stdout,process.stderr
 */

const { Console } = require('console')
const fs = require('fs')
function demo1() {
    const out = fs.createWriteStream('./stdout.log')
    const err = fs.createWriteStream('./stderr.log')

    const logger = new Console({stdout: out, stderr: err})

    logger.info('info')
    logger.log('log')
    logger.error('error')

    logger.assert(true, 'assert = true')
    logger.assert(false, 'assert = false')

    logger.count('abc')
    logger.count('abc')

    logger.countReset('abc')
    logger.count('abc')

    logger.dir('./')

    logger.table([{a: 1, b: 2}, {a: 3, b: 4}, {a: 5, b: 6}])

    logger.time('time')
    for (let i = 0; i < 1000000; i++) {
        const test = {count: i}
    }
    logger.timeEnd('time')

}

demo1()