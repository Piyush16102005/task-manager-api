const express = require("express");
const { body } = require("express-validator");
const { runValidation } = require("../middleware/validate");
const { signup, login } = require("../controllers/userController");

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 chars"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars")
  ],
  runValidation,
  signup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars")
  ],
  runValidation,
  login
);

module.exports = router;
