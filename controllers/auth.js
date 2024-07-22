const express = require('express')
const router = express.Router()

router.post('/', require('./authController').handleLogin)

module.exports = router