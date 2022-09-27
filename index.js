const express = require("express");

// express app
const app = express();

// register view engine
app.set("view engine", "ejs");

// listen for requests on port 3000
app.listen(3000);

//Home
app.get("/", (req, res) => {
  res.render("index", { title: "Code University" });
});

//Courses
app.get("/courses", (req, res) => {
  const courses = [
    // This is here simply to act as a placeholder for the actual data
    // It is copy/paste repeated to illustrate the scroll on the table
    // If possible, I would recommend folding this array
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV240",
      dept_id: "SDEV",
      course_id: "240",
      credit_hours: 3,
      name: "Software Development in C#",
      desc: "Learn the C# language",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
    {
      course_code: "SDEV255",
      dept_id: "SDEV",
      course_id: "255",
      credit_hours: 3,
      name: "Web Application Development",
      desc: "Create applications on the web!",
    },
  ];
  res.render("courses", { title: "courses", courses });
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
