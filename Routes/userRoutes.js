const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  getUsers,
} = require("../Controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.get("/all", getUsers);

module.exports = router;
