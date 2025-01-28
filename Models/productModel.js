const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  peremption: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", productSchema);
