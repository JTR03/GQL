const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    plot: {
        type: String,
        required: true
    },
    character: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Story', schema)