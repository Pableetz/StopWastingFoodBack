const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductsByUserId,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../Controllers/productController");
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/create", authMiddleware, createProduct);
router.get("/all", authMiddleware, getProducts);
router.get("/myproducts", authMiddleware, getProductsByUserId);
router.put("/update/:id", authMiddleware, updateProduct);
router.delete("/delete/:id", authMiddleware, deleteProduct);

module.exports = router;
