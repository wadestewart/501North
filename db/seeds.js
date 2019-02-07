// Referenced Comment model exported from schema file
const Comment = require('../model/schema')
const seedData = require('./seeds.json')

// Clearing out any objects that might be in the database, then inserting seedData - note: this is ideal for bulk insertion, but bypasses validation (we'll validate with Comment.create() in controller)
Comment.remove({})
    .then(() => {
        return Comment.collection.insert(seedData)
    })
    .then(() => {
        process.exit()
    })
