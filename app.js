const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Routers
const courseRouter = require("./routers/courseRouter");
const authRouter = require("./routers/authRouter");
const accountRouter = require("./routers/accountRouter");
const {requireAccountEdit,checkUser} = require("./middleware/authMiddleware");

// Setup
const app = express();

const dbURI = "mongodb+srv://team4:OU5Acjz3VOzsbeHw@sdev255-team4-groupproj.tany3x9.mongodb.net/SDEV255-Team4";
mongoose.connect(dbURI)
	.then(() => app.listen(3000))
	.catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("*", checkUser);

// Get Requests
app.get("/", (req,res) => {
	res.render("index",{
		title:"Code University",
		popups: {
			newCourse:false,
			editCourse:false,
			deleteCourse:false,
			login:true,
			register:true,
			logout:true
		}
	});
});

// Use Routers
app.use("/courses", courseRouter);
app.use("/auth", authRouter);
app.use("/accounts", requireAccountEdit, accountRouter);

// 404 Page
app.use((req,res) => {
	res.status(404).render("404", {
		title:"404",
		popups: {
			newCourse:false,
			editCourse:false,
			deleteCourse:false,
			login:true,
			register:true,
			logout:true
		}
	});
});