require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");

require("./db/conn");

const Register = require("./models/register");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/sign_in", (req, res) => {
    res.render("sign_in");
})

app.get("/teacher", (req, res) => {
    res.render("teacher");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/register", async (req, res) => {
    try {
        const regStud = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            country: req.body.country,
            gender: req.body.gender,
            password: req.body.password,
            confirmpassword: req.body.cpassword,
            queries: req.body.desc
        })

        const token = await regStud.generateAuthToken();

        const registered = await regStud.save();
        res.status(201).render("sign_in");

    } catch (error) {
        res.status(404).send(error);
    }
})

// logic check
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({ email });
        const isMatch = await bcrypt.compare(password, useremail.password);
        const token = await useremail.generateAuthToken();  // authentication of token
        // console.log(token);
        if (isMatch) {
            res.status(201).render("index");
        } else {
            res.send("Invalid login details");
        }
    } catch (e) {
        res.status(400).send("Invalid login details");
    }
})


app.listen(port, () => {
    console.log(`server is running at port : ${port}`);
})