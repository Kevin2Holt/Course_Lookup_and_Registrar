const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
	dept_id: {
		type: String,
		required: true
	},
	course_id: {
		type: String,
		required: true
	},
	credit_hours: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	desc: {
		type: String,
		required: false
	}
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;