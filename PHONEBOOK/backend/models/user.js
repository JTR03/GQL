const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
});

mongoose.plugin(uniqueValidator);

module.exports = mongoose.model("User", Schema);
