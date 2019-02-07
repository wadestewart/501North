// Requiring the mongoose instance from the connection file
const mongoose = require ('./connection')

// Using schema to define blueprint for Comment model (what attributes and their data types)
const CommentSchema = new mongoose.Schema({
    userComment = String
})

// Attaching schema to out model - two args = name of model (Comment) and our schema (CommentSchema)
const Comment = mongoose.model('Comment', CommentSchema)

// When this file is required in other files it will evaluate to this Comment model defined here through which we will be able to query the comments collection in our database
module.exports = Comment
