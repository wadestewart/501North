const express = require('express')
const router = express.Router()

const Comment = require('../model/schema')

router.get('/', (req, res) => {
    Comment.find({})
        // .then(comments => console.log(comments))
        .then(comments => res.render('index', { comments }))
        .catch(err => console.log(err))
})

router.get('/new', (req, res) => {
    res.render('/new')
})

module.exports = router
