/**
 * 该对象可发布和监听消息
 */

const http = require('http')
const diagnostics_channel = require('diagnostics_channel')

const channel = diagnostics_channel.channel('http-request')

function onMessage(msg) {
    console.log(msg)
}

diagnostics_channel.subscribe('http-request', onMessage)

setTimeout(() => {
    if (channel.hasSubscribers) {
        channel.publish({
            some: 'data'
        })
        diagnostics_channel.unsubscribe('http-request', onMessage)
    }
}, 3000)