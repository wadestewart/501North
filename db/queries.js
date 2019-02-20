const Pool = require('pg').Pool
const pool = new Pool({
    user: 'hopkins',
    host: 'localhost',
    database: 'five_zero_one_api',
    password: 'hopkins',
    port: 5432
})

const getComments = (req, res) => {
    pool.query('SELECT * FROM comments ORDER BY id ASC', (err, results) => {
        let comments = results.rows
        if (err) {
            throw err
        }
        res.status(200).render('index', { comments })
    })
}

const getCommentById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM comments WHERE id = $1', [id], (err, result) => {
        let comment = result.rows
        if(err) {
            throw err
        }
        res.status(200).render('edit-comment', comment)
    })
}

const createComment = (req, res) => {
    const text = req.body

    pool.query('INSERT INTO comments text VALUES ($1)', [text], (err, result) => {
        if (err) {
            throw err
        }
        res.status(201).send(`Comment added with ID: ${result.insertId}`)
    })
}

const updateComment = (req, res) => {
    const id = parseInt(req.params.id)
    const text = req.body

    pool.query('UPDATE comments SET text = $1 WHERE id = $2', [text], (err, results) =>{
        if (err) {
            throw err
        }
        res.status(200).send(`Comment modified with ID: ${id}`)
    })
}

const deleteComment = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM comments WHERE id = $1', [id], (err, results) =>{
        if(err) {
            throw err
        }
        res.status(200).send(`Comment deleted with ID: ${id}`)
    })
}

module.exports = {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}
