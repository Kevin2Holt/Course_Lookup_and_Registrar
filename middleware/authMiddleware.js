const jwt = require("jsonwebtoken");
const User = require("../models/user")
const mongoose = require("mongoose");

module.exports.requireAccountEdit = (req, res, next) => {

	const token = req.cookies.codeuni_accountToken;

	//Check json web token exists & is verified
	if(token) {
		jwt.verify(token, "superSecret", async (err, decodedToken) => {
			if(err) {
				console.log(err.message);
				res.redirect("/");
			}
			else {
				let user = await User.findById(decodedToken.id);;
				if(user.permissions.includes("account.edit")) {
					next();
				}
				else {
					res.redirect("/");
				}
			}
		});
	}
	else {
		res.redirect("/");
	}
}

module.exports.requireCourseRegister = (req, res, next) => {

	const token = req.cookies.codeuni_accountToken;

	//Check json web token exists & is verified
	if(token) {
		jwt.verify(token, "superSecret", async (err, decodedToken) => {
			if(err) {
				console.log(err.message);
				res.redirect("/");
			}
			else {
				let user = await User.findById(decodedToken.id);;
				if(user.permissions.includes("course.register")) {
					next();
				}
				else {
					res.redirect("/");
				}
			}
		});
	}
	else {
		res.redirect("/");
	}
}

//Check current user
module.exports.checkUser = (req,res,next) => {
	const token = req.cookies.codeuni_accountToken;

	if(token) {
		jwt.verify(token, "superSecret", async (err, decodedToken) => {
			if(err) {
				console.log(err.message);
				res.locals.user = null;
				next();
			}
			else {
				res.locals.user = await User.findById(decodedToken.id);

				next();
			}
		});
	}
	else {
		console.log("1");
		res.locals.user = null;
		next();
	}
}