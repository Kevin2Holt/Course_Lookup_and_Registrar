const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for users
const registerSchema = new Schema({
	stud_id: {
		type: String,
		required: true
	},
	course_id: {
		type: String,
		required: true
	}
	},
	{ timestamps: true }
);

const Register = mongoose.model("registered_class", registerSchema);

module.exports = Register;
