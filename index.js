const express = require("express");
const mongoose = require("mongoose");
const courseRouter = require("./routes/courseRouter")

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

//Home
app.get("/", (req, res) => {
	res.render("index", { title: "Code University" });
});

app.use("/courses", courseRouter);

// 404 page
app.use((req, res) => {
	res.status(404).render("404", { title: "404" });
});
