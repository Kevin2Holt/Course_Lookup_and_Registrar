const Course = require("../models/course");

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
			console.log(result);
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
	res.render("./courses/register", {
		title: "Add/Drop Classes",
		popups: {
			newCourse:false,
			editCourse:false,
			deleteCourse:false,
			login:false,
			register:false,
			logout:true
		}
	});
};

module.exports.create_post = (req, res) => {
	const course = new Course(req.body);

	course.save()
		.then((result) => res.redirect("/courses"))
		.catch((err) => console.log(err));
};

module.exports.update_post = (req,res) => {
	const id = req.params.id;
	console.log(id);
	console.log(req.body);
	Course.findByIdAndUpdate(id,req.body)
		.then((result) => res.redirect("/courses"))
		.catch((err) => console.log(err));
};

module.exports.delete_delete = (req,res) => {
	const id = req.params.id;
	Course.findByIdAndDelete(id)
		.then((result) => res.json({redirect: "/courses"}))
		.catch((err) => console.log(err));
};