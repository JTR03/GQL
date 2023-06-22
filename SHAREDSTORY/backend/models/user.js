const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        unique: true
    },
    stories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Story"
        }
    ]
})

mongoose.plugin(uniqueValidator)

module.exports = mongoose.model('User',schema)