const mongoose = require("mongoose");
const { Schema } = mongoose;

const team = new Schema({
  name: {type: String, required: true},
  members: {type: Array}
});

module.exports = mongoose.model("teams", team);
