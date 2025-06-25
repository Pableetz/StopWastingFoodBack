const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  time: {
    type: Number,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  instructions: {
    type: String,
    required: false,
  },
  ingredients: {
    type: String,
    required: false,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments"
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
