require('dotenv').config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

require("./db/conn");
const app = express();

const Register = require("./models/register");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/personal", auth, (req, res) => { // ye page load hone se pehle hmne middleware add kr diya
    res.render("personal");
});

app.get("/logout", auth, async (req, res) => {
    try {
        // for single logout
        req.user.tokens = req.user.tokens.filter((curEle) => {
            return curEle !== req.token;
        })

        // logout from all devices
        // res.user.tokens = [];

        res.clearCookie("jwt");
        await req.user.save();
        res.render("sign_in");
    } catch (e) {
        res.status(500).send(e);
    }
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

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 3000),
            httpOnly: true
        });

        const registered = await regStud.save();
        res.status(201).render("sign_in");

    } catch (error) {
        res.status(404).send(error);
    }
})

// login check
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({ email });
        const isMatch = await bcrypt.compare(password, useremail.password);
        const token = await useremail.generateAuthToken();  // authentication of token
        // console.log(token);

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 30000),
            httpOnly: true,
            // secure:true  // ye sirf secure connection (https) mai work krta hai
        });
        console.log(`Matched: ${isMatch}`);
        console.log(`Entered: ${password}`);
        console.log(`Given: ${useremail.password}`);

        if (isMatch) {
            res.status(201).render("index");
        } else {
            res.send("Invalid login details");
        }
    } catch (e) {
        res.status(400).send("Invalid login details failed");
    }
})


app.listen(port, () => {
    console.log(`server is running at port : ${port}`);
})