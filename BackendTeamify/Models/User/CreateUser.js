const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  id: { type: Number, unique: true},
  first_name: { type: String, default: "Verified Customer" },
  last_name: { type: String, default: "Verified Customer" },
  email: { type: String, default: "abc@gmail.com" },
  gender: { type: String },
  avatar: { type: String },
  domain: { type: String },
  available: { type: Boolean },
});
// Pre-save hook to set the id attribute
user.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const highestIdUser = await this.constructor.findOne(
        {},
        {},
        { sort: { id: -1 } }
      ); // Find the user with the highest id
      const highestId = highestIdUser ? highestIdUser.id : 0; // Get the highest id or default to 0
      this.id = highestId + 1; // Set the id attribute to 1 more than the highest id
    }
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("users", user);
