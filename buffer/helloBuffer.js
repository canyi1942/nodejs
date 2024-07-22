/**
 * Buffer:用于表示一个固定长度的字节序列
 * 1：其是UintArray的一个字类
 */
const {Buffer} = require('buffer')

// 新建一个字节序列
function helloBuffer() {
    const buf1 = Buffer.alloc(10)
    console.log(buf1)

    const buf2 = Buffer.alloc(10, 'a', 'utf-8')
    console.log(buf2)

    // 创建速度比alloc要快，但是可能会包含旧数据，在使用前需要初始化
    const buf3 = Buffer.allocUnsafe(10)
    console.log(buf3)

    const buf4 = Buffer.from([1,23])
    console.log(buf4)

    // 数组中的值，范围需要在0-255之间，原理使用 value & 255
    const buf5 = Buffer.from([257, 257.5, -255, '1'])
    console.log(buf5)

    const buf6 = Buffer.from('aaa', 'utf-8')
    console.log(buf6)

    const buf7 = Buffer.from('中a')
    console.log(buf7)
}

/**
 * buffer和字符串之间可以互相转化
 */
function translateBufferAndString() {
    const buf = Buffer.from('hello 中国 ？ （）', 'utf-8')
    console.log(buf)
    const str = buf.toString('utf-8')
    console.log(str)
}

/**
 * 1:buffer 是uint8array和typedarray的字类，buffer可以使用父类的方法，不过一些方法
 * 在buffer中进行了复写，所以行为会不一样：比如tostring,slice,map等
 * 
 * 2: 有两种方式在buffer上新建typedarray：new **Array(buf)和new **Array(buf.buffer)
 * 第一种方式将创建buffer的副本，第二种方法就和buf.buffer共享内存 
 *
 */
function bufferAndTypedArray() {
    
    // 使用第一种方式创建typearray
    const buf = Buffer.from([1,2,3,4])
    const uint32array = new Uint32Array(buf)
    console.log(uint32array, uint32array.byteLength)

    // 使用第二种方式创建typearray
    const buf2 = Buffer.from('hello', 'utf-8')
    const uin16array = new Uint16Array(
        buf2.buffer,
        buf2.byteOffset,
        buf2.length/Uint16Array.BYTES_PER_ELEMENT
    )
    console.log(buf2.buffer, buf2.byteOffset, buf2.length, Uint16Array.BYTES_PER_ELEMENT)
    console.log(uin16array)
}

function createBufferFromTypedArray() {
    const arr = new Uint16Array(2)

    arr[0] = 5000
    arr[1] = 4000

    // 复制arr中的buffer
    const buf1 = Buffer.from(arr)

    // 和arr的buffer共享内存
    const buf2 = Buffer.from(arr.buffer, 0, arr.buffer.byteLength)

    console.log(buf1)
    console.log(buf2)

    arr[1] = 6000

    console.log(buf1)
    console.log(buf2)
    console.log(arr.buffer)

}

createBufferFromTypedArray()

// bufferAndTypedArray()

// translateBufferAndString()

// helloBuffer()