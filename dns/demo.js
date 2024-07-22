/**
 * dns 提供了用于解析域名和反向解析ip为域名的功能
 * 提供了两种使用方式，回调和promise
 * dns.lookup使用的是操作系统设施，底层的调用类似于ping,
 *  在官方文档中记录该函数是同步执行的，使用的是libuv中的线程池，但是在下文的lookup函数的
 *  运行记录来看，却是异步的，所以暂时还是认为该函数时异步调用的
 * dns.resolve和dns.reserve始终是在网络上执行DNS查询，此通信始终是异步的，不适用libuv的线程池
 */

const dns = require('dns')

function lookup() {
    console.log('start lookup')
    dns.lookup('www.runoob.com', (error, address, family) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`address: ${address} family: ${family}`)
    })

    console.log('test lookup is sync or async')
}

function resolve() {
    dns.resolve('www.runoob.com', 'A', (err, address) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(address)
    })
}

function reverse() {
    dns.reverse('93.184.216.34', (err, hostnames) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(hostnames)
    })
}

function getServers() {
    const arr = dns.getServers()
    console.log(arr)
}


// getServers()
// reverse()
// resolve()
lookup()