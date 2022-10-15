const express = require ("express");
const accountController = require("../controllers/accountController");
// const {require_account_edit} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(	"/list", 	accountController.list_get);
// router.get(	"/logout",	accountController.logout_get);
router.delete("/:id",	accountController.delete_delete);
router.get(	"/:id", 	accountController.details_get);


module.exports= router;