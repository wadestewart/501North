const Pool = require('pg').Pool
const pool = new Pool({
    user: 'hopkins',
    host: 'localhost',
    database: 'five_zero_one_api',
    password: 'hopkins',
    port: 5432
})

const getComments = (req, res) => {
    pool
        .query('SELECT * FROM comments ORDER BY id ASC', (err, results) => {
        let comments = results.rows
        if (err) {
            throw err
        }
        res
            .status(200)
            .render('index', { comments })
    })
}

const createComment = (req, res) => {
    const user_comment = req.body.user_comment

    pool
        .query('INSERT INTO comments (user_comment) VALUES ($1)', [user_comment])
        .then(() => res.redirect('/comments'))
        .catch(e => setImmediate(() => { throw e }))
}

const getCommentById = (req, res) => {
    const id = parseInt(req.params.id)

    pool
        .query('SELECT * FROM comments WHERE id = $1', [id], (err, result) => {
            const comment = result.rows[0]
            if (err) {
                throw err
            }
            res
                .status(200)
                .render('edit-comment', comment)
        })
            
}

const updateComment = (req, res) => {
    const id = parseInt(req.params.id)
    const user_comment = req.body.user_comment

    pool
        .query('UPDATE comments SET user_comment = $1 WHERE id = $2', [user_comment, id])
        .then(() => res.redirect('/comments'))
        .catch(e => setImmediate(() => { throw e }))
}

const deleteComment = (req, res) => {
    const id = parseInt(req.params.id)

    pool
        .query('DELETE FROM comments WHERE id = $1', [id])
        .then(() => res.redirect('/comments'))
        .catch(e => setImmediate(() => { throw e }))
}

module.exports = {
    getComments,
    createComment,
    getCommentById,
    updateComment,
    deleteComment
}
