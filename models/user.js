const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

//Schema for users
const userSchema = new Schema({
	lastName: {
		type: String,
		uppercase: true
	},
	firstName: {
		type: String,
		uppercase: true
	},
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
		lowercase: true,
		validate: [isEmail, "Please enter a valid email"]
	},
	username: {
		type: String,
		required: [true, "Please enter a username"]
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Minimum password length is 6 characters"]
	},
	accountType: {
		type: String
	},
	permissions: {
		type: [String],
		required: true
	}
	},
	{ timestamps: true }
);

userSchema.virtual("name").get(function() {
	return this.firstName.charAt(0).toUpperCase()+this.firstName.slice(1).toLowerCase() + " " + this.lastName.charAt(0).toUpperCase()+this.lastName.slice(1).toLowerCase();
});

// Fire a function before doc saved to db
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

//Static method to login user
userSchema.statics.login = async function(username, password) {
	const user = await this.findOne({username});
	if(user) {
		const auth = await bcrypt.compare(password,user.password);
		if(auth) {
			return user;
		}
		throw Error("Incorrect password");
	}
	throw Error("Incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
