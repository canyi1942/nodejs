const path = require('path')
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3500

const app = express()

app.use((req, resp, next) => {
    console.log('我是第一个自定义中间件的开始')
    next()
    console.log('我是第一个自定义中间件的结束')
})

app.use((req, resp, next) => {
    console.log('我是第二个自定义中间件的开始')
    next()
    console.log('我是第二个自定义中间件的结束')
})

const whiteList = ['https://www.google.com']
const corsOptions = {
    origin: (origin, callback) => {
        // console.log(origin)
        if (whiteList.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('not allowed by cors'))
        }
    },
    optionsSuccessStatus: 200
}
const register = require('./controllers/register')
// app.use(express.urlencoded())
app.use(cors(corsOptions))
app.use(express.static('./util'))
// app.use(express.json())
app.use(require('./jsonMiddleWare')())
app.use('/register', register)
app.use('/auth', require('./controllers/auth'))
app.get('/', (req, resp) => {
    // resp.send('hello world')
    resp.sendFile('./fsDemo.js', { root: __dirname})
})

app.get('/demo', (req, resp) => {

    resp.redirect('/')
})

app.get('/*', (req, resp) => {
    resp.sendFile(path.join(__dirname, req.url))
    console.log('提供http服务')
})

app.listen(PORT, () => {
    console.log('express running on ', PORT)
})


function getNodeENV() {
    const arr = process.argv.slice(2)
    if (arr.includes('--dev')) {
        process.env.NODE_ENV = 'development'
    } else if(arr.includes('--prod')){
        process.env.NODE_ENV = 'production'
    } else {
        process.env.NODE_ENV = 'development'
    }
}

getNodeENV()