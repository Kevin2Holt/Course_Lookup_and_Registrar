const express = require ("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(	"/register",	authController.register_post);
router.post(	"/login",		authController.login_post);
router.get(		"/logout",		authController.logout_get);
router.post(	"/edit/:id",	authController.edit_post);

module.exports= router;