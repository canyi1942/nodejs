const buf = Buffer.from('伟鹏', 'utf-8')
console.log('buf', buf)
console.log(buf.toString('hex'))
console.log(buf.toString('base64'))
console.log(buf.toString('utf-8'))


const buf1 = Buffer.alloc(9, '中国人人', 'utf-8')
console.log(buf1.toString('utf-8'))

const buf3 = Buffer.from([1,2])
console.log(buf3.toString('utf-8'))

const buf2 = Buffer.allocUnsafe(2)
console.log('buf2', buf2)


const buf4 = Buffer.from('中国')
console.log(buf4.length)


const buf5 = Buffer.alloc(100)
const len = buf5.write('www.runoob.com')
console.log(len, buf5.length)


const buf6 = Buffer.alloc(26)

for (let i = 0; i < 26; i++) {
    buf6[i] = i + 97
}

console.log(buf6.toString())
console.log(buf6.toString('ascii', 0, 5))


