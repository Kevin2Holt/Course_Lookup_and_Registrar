const express = require("express");
const mongoose = require("mongoose");
// const morgan = require("morgan");
const Course = require("./models/course");

// express app
const app = express();

// Connect to MongoDB
const dbURI = "mongodb+srv://team4:OU5Acjz3VOzsbeHw@sdev255-team4-groupproj.tany3x9.mongodb.net/SDEV255-Team4?retryWrites=true&w=majority";
mongoose.connect(dbURI)
	.then(() => app.listen(3000))
	.catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// Middleware & Static Files
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
// app.use(morgan("dev"));

//Home
app.get("/", (req, res) => {
	res.render("index", { title: "Code University" });
});

//Courses
app.get("/courses", (req, res) => {
	Course.find()
		.then((result) => res.render("courses", {title: "Courses", courses: result}))
		.catch((err) => console.log(err));
});

app.get("/courses/:id", (req, res) => {
	const id = req.params.id;
	Course.findById(id)
		.then((result) => {
			console.log(result);
			res.render("courseDetails", {title: "Course Details", course: result});
		})
		.catch((err) => console.log(err));
});

app.post("/courseCreate", (req, res) => {
	const course = new Course(req.body);

	course.save()
		.then((result) => res.redirect("/courses"))
		.catch((err) => console.log(err));
});

app.post("/courseUpdate/:id", (req,res) => {
	const id = req.params.id;
	console.log(id);
	console.log(req.body);
	Course.findByIdAndUpdate(id,req.body)
		.then((result) => res.redirect("/courses"))
		.catch((err) => console.log(err));
});

app.delete("/courseRemove/:id", (req,res) => {
	const id = req.params.id;
	Course.findByIdAndDelete(id)
		.then((result) => {
			res.json({redirect: "/courses"});
		})
		.catch((err) => console.log(err));
});

//Extra I haven't gotten rid of
app.get("/link", (req, res) => {
	res.render("link", { title: "Link" });
});

// 404 page
// app.use() needs to go at the end, after all app.get()
app.use((req, res) => {
	res.status(404).render("404", { title: "404" });
});
