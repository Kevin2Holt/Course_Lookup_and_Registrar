const express = require ("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.get(		"/",			courseController.list_get);
router.get(		"/register",	courseController.register_get);
router.post(	"/create",		courseController.create_post);
router.get(		"/:id",			courseController.details_get);

module.exports = router;