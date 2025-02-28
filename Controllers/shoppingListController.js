const ShoppingList = require("../Models/shoppingListModel");
const User = require("../Models/userModel");
const Product = require("../Models/productModel");

const createShoppingList = async (req, res) => {
  try {
    const shoppingList = new ShoppingList({
      ...req.body,
      owner: req.user._id,
    });

    await shoppingList.save();

    res.status(201).send({ message: "Shopping list created", shoppingList });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getShoppingListById = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findOne({ _id: req.params.id });
    res.status(200).send(shoppingList);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!shoppingList) {
      return res.status(404).send({ error: "Shopping list not found" });
    }

    res.status(200).send(shoppingList);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
