const mongoose = require("mongoose");
const { create } = require("./recipeModel");
const { Schema } = mongoose;

const commentaireSchema = new Schema({
  commentaire: {
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

module.exports = mongoose.model("Commentaire", commentaireSchema);
