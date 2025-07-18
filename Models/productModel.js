const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "Fruits",
      "Légumes",
      "Viandes",
      "Poissons",
      "Produits laitiers",
      "Epices",
      "Céréales",
      "Boissons",
      "Autres",
    ],
    default: "Autres",
  },
  quantity: {
    type: Number,
    required: true,
  },
  expire_at: {
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
  status: {
    type: String,
    enum: ["available", "expired", "consumed"],
    default: "available",
  },
});

module.exports = mongoose.model("Product", productSchema);
