const express = require("express");
const { body, param } = require("express-validator");
const auth = require("../middleware/auth");
const { runValidation } = require("../middleware/validate");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const router = express.Router();

router.use(auth);

router.post(
  "/",
  [body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 chars")],
  runValidation,
  createTask
);

router.get("/", getTasks);

router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid task id")],
  runValidation,
  getTaskById
);

router.patch(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid task id"),
    body("title").optional().isLength({ min: 3 }).withMessage("Title must be at least 3 chars"),
    body("completed").optional().isBoolean().withMessage("Completed must be boolean")
  ],
  runValidation,
  updateTask
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid task id")],
  runValidation,
  deleteTask
);

module.exports = router;
