const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    topic:{
        type: String,
        required: true,
        unique: true
    },
    stories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    }
})

mongoose.plugin(uniqueValidator)

module.exports = mongoose.model('Topics',schema)