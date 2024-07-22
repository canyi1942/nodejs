const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname, 'index.html'))
})

router.route('/')
    .get((req, resp) => {
        resp.json({
            name: 'weipeng'
        })
    }).post((req, resp) => {
        resp.json({
            name: 'post'
        })
    })