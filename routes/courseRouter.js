const express = require("express");
const courseController = require("../controllers/courseController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/", authenticate, courseController.course_list);
router.get("/:id", courseController.course_details);
router.post("/create", courseController.course_create);
router.post("/update/:id", courseController.course_update);
router.delete("/delete/:id", courseController.course_delete);

module.exports = router;
