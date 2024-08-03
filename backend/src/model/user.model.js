const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Favorite" }],
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "History" }],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
