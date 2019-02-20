const express = require('express')
const router = express.Router()
const db = require('../db/queries')

// Used this article as a guide: https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8

router.get('/', (req, res) => {
    res.render('welcome')
})

router.get('/comments', db.getComments)

router.post('/comments', db.createComment)
    
router.get('/comments/edit/:id', db.getCommentById)

router.put('/comments/:id', db.updateComment)

router.delete('/comments/:id', db.deleteComment)

module.exports = router
