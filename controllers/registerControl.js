const usersDB = {
    users: require('./data.json'),
    setUsers: function (data) {
        this.users = data
    }
}

const fsp = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, resp) => {
    console.log('req', req.body)
    const { user, pwd } = req.body
    if (!user || !pwd) {
        return resp.status(400).json({
            'message': 'Username and password are required'
        })
    }
    const duplicate = usersDB.users.find(person => person.username === user)
    if (duplicate) {
        return resp.status(409).json({
            message: '重复添加'
        })
    } 
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10)
        const newUser = {
            'username': user,
            password: hashedPwd
        }
        usersDB.setUsers([...usersDB.users, newUser])
        await fsp.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(usersDB.users))
        console.log(usersDB.users)
        resp.status(201).json({
            message: 'new user success'
        })
    } catch (error) {
        resp.status(500).json({
            'message': error.message
        })
    }
}

module.exports = {
    handleNewUser
}