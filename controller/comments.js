const express = require('express')
const router = express.Router()

const Comment = require('../model/schema')

router.get('/', (req, res) => {
    Comment.find({})
        .then(comments => {
            res.render('index', { comments })
        })
})
