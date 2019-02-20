const express = require('express')
const router = express.Router()

const Comment = require('../model/schema')

router.get('/', (req, res) => {
    res.render('welcome')
})

router.get('/comments', (req, res) => {
    Comment
        .find({})
        .then(comments => res.render('index', { comments }))
        .catch(err => console.log(err))
})

router.post('/comments', (req, res) => {
    Comment
        .create(req.body)
        .then(() => res.redirect('/comments'))
})
        
router.get('/comments/edit/:id', (req, res) => {
    Comment
        .findOne({ _id: req.params.id })
        .then(comment => res.render('edit-comment', comment))
})

router.put('/comments/:id', (req, res) => {
    Comment
        .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(() => res.redirect('/comments'))
})

router.delete('/comments/:id', (req, res) => {
    Comment
        .findOneAndDelete({ _id: req.params.id })
        .then(() => res.redirect('/comments'))
})

module.exports = router
