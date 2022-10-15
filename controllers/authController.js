const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.register_post = async (req,res) => {
	const {lastName,firstName,email,username,password,accountType} = req.body;
	let permissions;

	switch(accountType) {
		case "STUDENT":
			permissions = [
				"course.register"
			];
			break;
		case "FACULTY":
			permissions = [
				"course.edit"
			];
			break;
		case "ADMIN":
			permissions = [
				"course.edit",
				"account.edit"
			];
			break;
		default:
			permissions = [];
	}
	try {
		const user = await User.create({lastName,firstName,email,username,password,accountType,permissions});
		const token = createToken(user._id);
		res.cookie("codeuni_accountToken",token, {httpOnly:true});
		res.redirect("/courses");
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({errors});
	}
};

module.exports.login_post = async (req,res) => {
	const {username,password} = req.body;

	try {
		const user = await User.login(username,password);
		const token = createToken(user._id);
		res.cookie("codeuni_accountToken", token, {httpOnly:true});
		res.redirect("/courses");
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({errors});
	}
};

module.exports.logout_get = (req,res) => {
	res.cookie("codeuni_accountToken","",{maxAge:1});
	res.redirect("/");
}

module.exports.edit_post = async (req,res) => {
	const id = req.params.id;

	const {lastName,firstName,email,username,accountType} = req.body;
	let permissions;

	switch(accountType) {
		case "STUDENT":
			permissions = [
				"course.register"
			];
			break;
		case "FACULTY":
			permissions = [
				"course.edit"
			];
			break;
		case "ADMIN":
			permissions = [
				"course.edit",
				"account.edit"
			];
			break;
		default:
			permissions = [];
	}

	await User.findByIdAndUpdate(id,{
		lastName,
		firstName,
		email,
		username,
		accountType,
		permissions
	})
		.then((result) => res.redirect("/accounts/"+id))
		.catch((err) => console.log(err));
}

const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = {email: "", password: ""};

	// Incorrect Email
	if(err.message === "Incorrect email") {
		errors.email = "That eamil is not registered";
	}

	// Incorrect Password
	if(err.message === "Incorrect password") {
		errors.password = "That password is incorrect ";
	}

	// Duplicate Error Code
	if(err.code === 11000) {
		errors.email = "That email is already registered";
		return errors;
	}

	// Validation Errors
	if(err.message.includes("user validation failed")) {
		Object.values(err.errors).forEach(({properties}) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
};

const createToken = (id) => {
	return jwt.sign({id}, "superSecret");
};