const express = require('express')
const router = express.Router()

const Comment = require('../model/schema')

router.get('/', (req, res) => {
    Comment
        .find({})
        .then(comments => res.render('index', { comments }))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    Comment
        .create(req.body)
        .then(comment => res.redirect('/'))
})

module.exports = router
