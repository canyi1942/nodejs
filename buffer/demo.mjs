import utilTypes from 'util/types'


function demo1() {
    console.log(Object.prototype.toString.call(Buffer))
    const buf = Buffer.from('hello', 'utf-8')
    console.log(Object.prototype.toString.call(buf))
    console.log('isUint8Array', utilTypes.isUint8Array(buf))
    console.log('isTypeArray', utilTypes.isTypedArray(buf))
}

function demo2() {
    const buf1 = Buffer.from('中国', 'utf-8')
    console.log(buf1)
    const buf = Buffer.from([1,2,3])
    const uint16 = new Uint16Array(buf1)
    console.log('uint16', uint16)
    console.log(uint16.toString())
}

function demo3() {
    const buf = Buffer.from('hello nodejs', 'utf-8')
    console.log('buf', buf)
    console.log(buf.byteOffset, buf.length, Uint8Array.BYTES_PER_ELEMENT)
    const uint16Array = new Uint8Array(buf.buffer)
    const decoder = new TextDecoder('utf-8')
    console.log(decoder.decode(uint16Array))
}

// demo2()
demo3()