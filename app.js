const express           = require('express')
const hbs               = require('express-handlebars')
const parser            = require('body-parser')
const methodOverride    = require('method-override')

const commentsController = require('./controller/comments')

const app               = express()
const PORT              = 4000

app.use(parser.urlencoded({ extended: true }))

app.set('view engine', 'hbs')
app.engine('.hbs', hbs({
    extname:        '.hbs',
    partialsDir:    'views/',
    layoutsDir:     'views/',
    defaultLayout:  'layout'
}))

let commentsRouter = require('./controller/comments')
app.use(commentsRouter)
app.use(methodOverride('_method'))
app.use('/', commentsController)

app.listen(PORT, () => console.log(`Live on port ${PORT}`))
