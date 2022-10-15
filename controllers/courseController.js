const jwt = require("jsonwebtoken");
const mongooser = require("mongoose");
const User = require("../models/user");
const Course = require("../models/course");
const Register = require("../models/registered_class");
// const {checkUser} = require("../middleware/authMiddleware");

module.exports.list_get = (req, res) => {
	Course.find()
		.then((result) => {
			res.render("./courses/courseList", {
				title: "Courses",
				popups: {
					newCourse:true,
					editCourse:false,
					deleteCourse:false,
					login:true,
					register:true,
					logout:true
				},
				courses: result
			})
		})
		.catch((err) => console.log(err));
};

module.exports.details_get = (req, res) => {
	const id = req.params.id;
	Course.findById(id)
		.then((result) => {
			res.render("./courses/details", {
				title: "Course Details",
				popups: {
					newCourse:false,
					editCourse:true,
					deleteCourse:true,
					login:true,
					register:true,
					logout:true
				},
				course:result
			});
		})
		.catch((err) => console.log(err));
};

module.exports.register_get = (req,res) => {
	Course.find()
		.then((result) => {
			res.render("./courses/register", {
				title: "Add/Drop Classes",
				popups: {
					newCourse:false,
					editCourse:false,
					deleteCourse:false,
					login:false,
					register:false,
					logout:true
				},
				courses: result
			});
		})
		.catch((err) => console.log(err));
};

module.exports.regDetails_get = (req,res) => {
	const id = req.params.id;
	Course.findById(id)
		.then((result) => {
			res.render("./courses/registerDetails", {
				title: "Course Details",
				popups: {
					newCourse:false,
					editCourse:false,
					deleteCourse:false,
					login:true,
					register:true,
					logout:true
				},
				course:result
			});
		})
		.catch((err) => console.log(err));
};

module.exports.addCourse_post = async (req,res) => {
	const id = req.params.id;
	const stuId = req.params.stuid;
	var isRegistered = false;
	await Register.find({course_id:id})
		.then((result) => {
			for(data of result) {
				if(data.stud_id == stuId) {
					isRegistered = true;
				}
			}
		})
		.catch((err) => console.log(err));
	
	if(!isRegistered) {
		const reg = new Register({stud_id:stuId, course_id:id});
		reg.save()
			.then((result) => res.redirect("/courses/register"))
			.catch((err) => console.log(err));
	}
	else res.redirect("/courses/register/my");
};

module.exports.my_get = async (req,res) => {
	var user;
	const token = req.cookies.codeuni_accountToken;
	var courses = [];

	if(token) {
		await jwt.verify(token, "superSecret", async (err, decodedToken) => {
			if(err) {
				console.log(err.message);
				user = null;
			}
			else {
				user = await User.findById(decodedToken.id);
			}
		});
	}
	else {
		user = null;
	}

	if(user) {

		await Register.find({"stud_id": user._id})
		.then(async (result) => {

			for(const data of result) {
				await Course.findById(data.course_id)
				.then((result2) => {
					courses.push(result2);
				})
				.catch((err) => console.log(err));
			}
		})
		.finally(() => {

			res.render("./courses/myCourses.ejs", {
				title: "My Courses",
				popups: {
					newCourse:false,
					editCourse:false,
					deleteCourse:false,
					login:false,
					register:false,
					logout:true
				},
				courses: courses
			});
		})
		.catch((err) => console.log(err));
	}
	else {
		res.redirect("/");
	}
};

module.exports.removeCourse_post = async (req,res) => {
	const courseId = req.params.id;
	const stuId = req.params.stuid;

	await Register.findOneAndDelete({course_id:courseId, stud_id:stuId})
		.then((result) => {
			res.redirect("/courses/register/my");
		})
		.catch((err) => console.log(err));
};

module.exports.create_post = (req, res) => {
	const course = new Course(req.body);

	course.save()
		.then((result) => res.redirect("/courses"))
		.catch((err) => console.log(err));
};

module.exports.update_post = async (req,res) => {
	const id = req.params.id;
	await Course.findByIdAndUpdate(id,req.body)
		.then((result) => res.redirect("/courses"))
		.catch((err) => console.log(err));
};

module.exports.delete_delete = (req,res) => {
	const id = req.params.id;
	Course.findByIdAndDelete(id)
		.then((result) => res.json({redirect: "/courses"}))
		.catch((err) => console.log(err));
};

const checkUser = async (token) => {

	if(token) {
		jwt.verify(token, "superSecret", async (err, decodedToken) => {
			if(err) {
				console.log(err.message);
				return null;
			}
			else {
				const user = await User.findById(decodedToken.id);
				console.log(user);
				return user;
			}
		});
	}
	else {
		return null;
	}
}
