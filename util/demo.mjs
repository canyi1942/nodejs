import util from 'util'

const obj = {
    name: 'weipeng',
    address: {
        city: 'beijing',
        home: {
            count: 1
        }
    }
}
console.log(util.inspect(obj, true, 5, true))
console.log(JSON.stringify(obj))