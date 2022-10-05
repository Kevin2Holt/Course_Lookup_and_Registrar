const Course = require("../models/course");

const course_list = (req, res) => {
	Course.find()
		.then((result) => res.render("courses/courseList", {title: "Courses", courses: result}))
		.catch((err) => console.log(err));
};

const course_details = (req, res) => {
	const id = req.params.id;
	Course.findById(id)
		.then((result) => {
			console.log(result);
			res.render("courses/details", {title: "Course Details", course: result});
		})
		.catch((err) => console.log(err));
};

const course_create = (req, res) => {
	const course = new Course(req.body);

	course.save()
		.then((result) => res.redirect("/courses"))
		.catch((err) => console.log(err));
};

const course_update = (req,res) => {
	const id = req.params.id;
	console.log(id);
	console.log(req.body);
	Course.findByIdAndUpdate(id,req.body)
		.then((result) => res.redirect("/courses"))
		.catch((err) => console.log(err));
};

const course_delete = (req,res) => {
	const id = req.params.id;
	Course.findByIdAndDelete(id)
		.then((result) => {
			res.json({redirect: "/courses"});
		})
		.catch((err) => console.log(err));
};

module.exports = {
	course_list,
	course_details,
	course_create,
	course_update,
	course_delete
}