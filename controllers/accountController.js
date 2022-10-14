const User = require("../models/user");

module.exports.list_get = (req,res) => {
	User.find()
		.then((result) => {
			res.render("./accounts/list", {
				title: "Courses",
				popups: {
					newCourse:true,
					editCourse:false,
					deleteCourse:false,
					login:true,
					register:true,
					logout:true
				},
				accounts: result
			})
		})
		.catch((err) => console.log(err));
};

module.exports.details_get = (req, res) => {
	const id = req.params.id;
	User.findById(id)
		.then((result) => {
			console.log(result);
			res.render("./accounts/details", {
				title: "Account Details",
				popups: {
					newCourse:false,
					editCourse:true,
					deleteCourse:true,
					login:true,
					register:true,
					logout:true
				},
				account:result
			});
		})
		.catch((err) => console.log(err));
};