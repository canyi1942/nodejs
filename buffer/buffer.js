/**
 * Buffer只能在nodejs环境中使用，且能直接操作缓冲区
 * ArrayBuffer可以在web和nodejs都使用，不能直接操作，只能通过typeArray使用
 */
const { Buffer, File } = require('buffer')

function byteLength() {
    const str = 'abc我12（）'
    const bl = Buffer.byteLength(str)
    console.log('byteLength', bl)
    console.log('length', str.length)
}

function compare() {
    const buf1 = Buffer.from('a')
    const buf2 = Buffer.from('b')
    const result = Buffer.compare(buf1, buf2)
    console.log(result)
}
/**
 * Buffer.concat,如果可以的话，最好指定totalLength,可以提升效率
 */
function concat() {
    const buf1 = Buffer.alloc(10)
    const buf2 = Buffer.alloc(14)
    const buf3 = Buffer.alloc(18)

    const totalLength = buf1.length + buf2.length + buf3.length
    console.log(totalLength)
    // console.log(buf1.byteLength)
    const buf = Buffer.concat([buf1, buf2, buf3], totalLength)
    console.log(buf)
    console.log(buf.length, buf.byteLength)
}

/**
 * Buffer.copyBytesFrom(view[, offset[, length]])，对底层内存进行复制；
 * view:类型为typedArray,
 * offset,和length，指的是元素单位，而不是字节单位，例如下例子中:
 */
function copyBytesFrom() {
    // 定义view，两个元素，由于是Uint16Array，所以每个元素使用2个字节进行表示，共4个字节
    const u16 = new Uint16Array([0, 0xffff])
    // offset、length指的是元素数，而不是字节数，复制开始的位置是第一个元素，长度为1，即复制的是第二个元素，
    // 由于是Uint16Array,所以每个元素是2个字节
    const buf = Buffer.copyBytesFrom(u16, 1, 1)
    u16[1] = 0
    console.log(u16.length, u16[0], u16[1], u16, u16.byteLength)
    console.log(buf.length, buf[0], buf[1], buf, buf.byteLength)
}

/**
 * Buffer.from(array)
 * array: 除去Buffer,Uint8Array,其余的类数组对象都可以
 * 该函数生成的内存存在于nodejs内部的buffer池，其中Buffer.from(string),Buffer.allocUnsafe也是使用内部buffer池
 */
function fromArray() {
    const buf = Buffer.from([0x01, 0x02])
    console.log(buf)
}

/**
 * Buffer.from(arrayBuffer, offset ,length):复制arrayBuffer的视图，不会复制底层内存
 * arrayBuffer: 跨平台的二进制操作对象，可在浏览器和nodejs环境中使用
 * Buffer:只能在nodejs中使用，不过性能比arrayBuffer要好
 * 需要注意的点：这里一定需要是ArrayBufferLike，才会不复制底层内存
 */
function fromArrayBuffer() {
    const arr = new Uint16Array(2)
    arr[0] = 5000
    arr[1] = 4000

    const buf = Buffer.from(arr.buffer)
    console.log(buf)

    arr[1] = 6000

    console.log(buf)

}

function fromBuffer() {
    const buf1 = Buffer.from('buffer')
    const buf2 = Buffer.from(buf1)
    buf1[0] = 0b1010
    console.log(buf1)
    console.log(buf2)
}

function isBuffer() {
    console.log(Buffer.isBuffer(Buffer.alloc(1)))
    console.log(Buffer.isBuffer(Buffer.allocUnsafe(12)))
    console.log(Buffer.isBuffer('a string'))
    console.log(Buffer.isBuffer(new Uint8Array(12)))
}

function isEncoding() {
    console.log(Buffer.isEncoding('utf-8'))
    console.log(Buffer.isEncoding('hex'))
    console.log(Buffer.isEncoding(''))
}

function poolSize() {
    console.log(Buffer.poolSize)
    const buf1 = Buffer.from('hello')
    console.log(buf1.byteLength)

    const buf2 = Buffer.alloc(10)
    console.log(buf2.byteLength)
}

function index() {
    const str = 'abc'
    const buf = Buffer.allocUnsafe(str.length)

    for (let i = 0; i < str.length; i++) {
        buf[i] = str.charCodeAt(i)
    }

    console.log(buf)
    console.log(buf.toString('utf-8'))
}

/**
 * buffer.buffer的类型是ArrayBuffer
 */
function bufferAttr() {
    const arrayBuffer = new ArrayBuffer(16)
    const buffer = Buffer.from(arrayBuffer)

    console.log(buffer.buffer === arrayBuffer)
}

/**
 * buffer.byteOffset：指的是buffer池中的内存的偏移量，Buffer.poolsize一般是8k个字节，有几个api分配创建buffer时，
 * 会直接使用该片的内存
 */
function byteOffsetAttr() {
    const buffer = Buffer.from('byteOffset')
    console.log(buffer.byteOffset)
    const buf2 = Buffer.from('hello')
    console.log(buf2.byteOffset)

    const uint8Array = new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.length)
    console.log(uint8Array.toString()) 
}

function compareAtrr() {
    const buf = Buffer.from('123')
    const buf2 = Buffer.from('234')
    const result = buf.compare(buf2)
    console.log(result)
}

/**
 * buffer.copy(target[,targetStart[, sourceStart[, sourceEnd]]])
 * 将buffer中的内容复制到target中去
 * target可以是buffer
 */
function copyAttr() {
    const buf = Buffer.from('buffer')
    const buf2 = Buffer.alloc(10)
    buf.copy(buf2, 0, 0, 3)
    console.log(buf2.toString())

    const buf3 = Buffer.allocUnsafe(26)
    const buf4 = Buffer.allocUnsafe(26).fill('!')

    for (let i = 0; i < 26; i++) {
        buf3[i] = i + 97
    }

    buf3.copy(buf4, 8, 16, 20)

    console.log(buf4.toString('utf8'))

    buf3.copy(buf3, 0, 2, 4)
    console.log(buf3.toString('ascii'))
}

function entriesAttr() {
    const buf = Buffer.from('buffer')

    for (const pair of buf.entries()) {
        console.log(pair)
    }
}

function equalsAttr() {
    const buf1 = Buffer.allocUnsafe(3).fill(1)
    const buf2 = Buffer.allocUnsafe(3).fill(1)
    console.log(buf1.equals(buf2), buf1, buf2)
}

function includeAttr() {
    const buf = Buffer.from('this is a buffer')
    console.log(buf.includes('this'))
    console.log(buf.includes('is', 0, 'utf-8'))

    console.log(buf.includes(Buffer.from('is')))
}

function indexOfAttr() {
    const buf = Buffer.from('this is a buffer')
    const index = buf.indexOf('a')
    console.log(index)
}

function lastIndexOfAttr() {
    const buf = Buffer.from('this is a buffer')
    const index = buf.lastIndexOf('is')
    console.log(index)

    console.log(buf.lastIndexOf(Buffer.from('is')))
}

function keysAttr() {
    const buf = Buffer.allocUnsafe(5).fill(1)

    for (const key of buf.keys()) {
        console.log(key)
    }
}

function valuesAttr() {
    const buf = Buffer.allocUnsafe(5).fill(1)

    for (const value of buf.values()) {
        console.log(value)
    }
}

function lengthAttr() {
    const buf = Buffer.alloc(10)
    console.log(buf.length, buf.byteLength)
}

/**
 * buffer.subarray([start[, end]]):返回一个新的buffer，它引用与原始内存相同的内存
 */
function subArrayAttr() {
    const buf = Buffer.allocUnsafe(26)

    for (i = 0; i < 26; i++) {
        buf[i] = i + 97
    }

    const buf2 = buf.subarray(0,3)
    console.log(buf2.toString())

    buf2[0] = 'f'
    console.log(buf.toString())
}

function toJSONAttr() {
    const buf = Buffer.from('buffer')
    console.log(buf.toJSON())
}

function writeAttr() {
    const buf = Buffer.allocUnsafe(10).fill()
    buf.write('buffer')
    console.log(buf, buf.toString())
}

function bufferFile() {
    const file = new File(['buffer'], 'file.txt')
    console.log(file.name, file.lastModified, file.size)
    
}

bufferFile()
// writeAttr()
// valuesAttr()
// toJSONAttr()
// subArrayAttr()
// lengthAttr()
// keysAttr()
// lastIndexOfAttr()
// indexOfAttr()
// includeAttr()
// equalsAttr()
// entriesAttr()
// copyAttr()
// compareAtrr()
// byteOffsetAttr()
// bufferAttr()
// index()
// poolSize()
// isEncoding()
// isBuffer()
// fromBuffer()
// fromArrayBuffer()
// fromArray()
// copyBytesFrom()
// byteLength()
// compare()
// concat()