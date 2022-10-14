const express = require ("express");
const courseController = require("../controllers/courseController");
const {requireCourseRegister} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(		"/", courseController.list_get);


router.get(		"/register",							courseController.register_get);
router.get(		"/register/my", requireCourseRegister,	courseController.my_get);
router.post(	"/register/add/:id/:stuid",				courseController.addCourse_post);
router.get(		"/register/:id",						courseController.regDetails_get);


router.post(	"/create",	courseController.create_post);
router.get(		"/:id",		courseController.details_get);

module.exports = router;