const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
});

module.exports = mongoose.model("Activity", schema);
