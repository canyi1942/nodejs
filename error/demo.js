/**
 * error 对象用于表示运行时错误。它是javascript内建Error的一个扩展，提供了更多的功能
 */

function demo() {
    const error = new Error('something went wrong')
    console.log(error.message, error.name, error.stack)
}

demo()