const express = require("express");
const router = express.Router();
const {
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipes,
  generateRecipes,
} = require("../Controllers/recipeController");

const authMiddleware = require("../Middleware/authMiddleware");

router.post("/create", authMiddleware, createRecipe);

router.get("/all", authMiddleware, getRecipes);

router.get("/:id", authMiddleware, getRecipeById);

router.put("/update/:id", authMiddleware, updateRecipe);

router.delete("/delete/:id", authMiddleware, deleteRecipe);

router.post("/generateRecipe", authMiddleware, generateRecipes);

module.exports = router;
