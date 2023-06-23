const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 5,
    unique: true,
  },
  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
});

mongoose.plugin(uniqueValidator);
module.exports = mongoose.model("User", schema);
