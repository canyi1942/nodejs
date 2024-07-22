const userDB = {
    users: require('./data.json'),
    setUsers: function(data) {
        this.users = data
    }
}
const jwt = require('jsonwebtoken')
const path = require('path')
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env-dev'
const envFilePath = path.join(path.resolve('.'), 'controllers', envFile)
console.log('envFilePath', envFilePath)
require('dotenv').config({
    path: envFile,
    encoding: 'utf-8'
})

const handleLogin = async (req, resp) => {
    const { user, pwd } = req.body

    if (!user || !pwd) {
        return resp.status(400).json({
            'message': '请输入用户名和密码'
        })
    }

    const foundUser = userDB.users.find((person) => person.username === user)

    if (!foundUser) {
        return resp.status(401).json({
            message: '用户找不到'
        })
    } 

    const match = await require('bcrypt').compare(pwd, foundUser.password)

    if (!match) {
        return resp.status(401).json({
            message: '密码不匹配'
        })
    } 

    const token = jwt.sign({username: foundUser.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
    const refreshToken = jwt.sign({username: foundUser.username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})


    resp.status(200).json({
        message: '用户登录成功'
    })
}

module.exports = {
    handleLogin
}