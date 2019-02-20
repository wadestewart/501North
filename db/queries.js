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
        res
            .status(200)
            .render('index', { comments })
    })
}

const createComment = (req, res) => {
    const user_comment = req.body.user_comment

    pool
        .query('INSERT INTO comments (user_comment) VALUES ($1)', [user_comment])
        // .then(() => console.log(req.body.user_comment))
        .then(() => res.redirect('/comments'))
        .catch(e => setImmediate(() => { throw e }))

    // pool
    //     .query('INSERT INTO comments (user_comment) VALUES ($1)', [user_comment], (err, result) => {
    //     if (err) {
    //         throw err
    //     }
    //     res
    //         .status(201)
    //         // .send(`Comment added with ID: ${result.insertId}`)
    //         .redirect('/comments', () => console.log(`Comment added with ID: ${result.insertId}`))
    // })
}

const getCommentById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM comments WHERE id = $1', [id], (err, result) => {
        let comment = result.rows
        if(err) {
            throw err
        }
        res
            .status(200)
            .render('edit-comment', comment)
    })
}

const updateComment = (req, res) => {
    const id = parseInt(req.params.id)
    const user_comment = req.body

    pool.query('UPDATE comments SET user_comment = $1 WHERE id = $2', [user_comment], (err, results) =>{
        if (err) {
            throw err
        }
        res
            .status(200)
            // .send(`Comment modified with ID: ${id}`)
            .redirect('/comments', console.log(`Comment modified with ID: ${id}`))
    })
}

const deleteComment = (req, res) => {
    const id = parseInt(req.params.id)

    pool
        .query('DELETE FROM comments WHERE id = $1', [id])
        // .then(() => console.log(`Comment deleted with ID: ${id}`))
        .then(() => res.redirect('/comments'))
        .catch(e => setImmediate(() => { throw e }))

    // pool
    //     .query('DELETE FROM comments WHERE id = $1', [id], (err, results) =>{
    //     if(err) {
    //         throw err
    //     }
    //     res
    //         .status(200)
    //         .send(`Comment deleted with ID: ${id}`)
    // })
}

module.exports = {
    getComments,
    createComment,
    getCommentById,
    updateComment,
    deleteComment
}
