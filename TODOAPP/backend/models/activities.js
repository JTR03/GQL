const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    task : {
        type: String,
        required: true
    },
    time: {
        type: String
    }
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }
})

module.exports = mongoose.model("Activity", schema)