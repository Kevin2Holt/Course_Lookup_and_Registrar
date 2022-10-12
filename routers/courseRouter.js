const express = require ("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.get(		"/",			courseController.list_get);
router.get(		"/:id",			courseController.details_get);
router.post(	"/create",		courseController.create_post);
router.post(	"/update/:id",	courseController.update_post);
router.delete(	"/delete/:id",	courseController.delete_delete);

module.exports = router;