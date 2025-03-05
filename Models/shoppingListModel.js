const mongoose = require("mongoose");
const { Schema } = mongoose;

const shoppingListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: String,
        required: true,
      },
      // ref: "Product",
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ShoppingList", shoppingListSchema);
