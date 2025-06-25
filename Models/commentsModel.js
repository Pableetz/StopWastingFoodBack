const mongoose = require("mongoose");
// const { create } = require("./recipeModel");
const { Schema } = mongoose;

const commentSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comments", commentSchema);
