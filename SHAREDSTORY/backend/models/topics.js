const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    topic:{
        type: String,
        required: true,
        unique: true
    }
})

mongoose.plugin(uniqueValidator)

module.exports = mongoose.model('Topics',schema)