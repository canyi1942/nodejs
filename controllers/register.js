const express = require('express')

const router = express.Router()

const controller = require('./registerControl')

router.post('/', controller.handleNewUser)

module.exports = router