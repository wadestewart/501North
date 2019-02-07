// In order to reference mongoose, we need to require the node module and save it to a variable
const mongoose = require('mongoose')

// Linking mongoose to our database
mongoose.connect('mongodb://localhost/comment', { useNewUrlParser: true })

// using mongoose promise library
mongoose.Promise = Promise

// When this file is required in other files, it will evaluate to this connected version of mongoose
module.exports = mongoose
