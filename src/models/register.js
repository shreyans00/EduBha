const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Defining Schema
const studSchema = new mongoose.Schema({
    firstname: {
        type: String,
        // required: true
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    phone: {
        type: Number,
        // required: true
    },
    age: {
        type: Number,
    },
    country: {
        type: String,
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    queries: {
        type: String,
    },
    tokens: [{ // token dene ke liye ye schema mai daalna jruri hai
        token: {
            type: String,
            required: true
        }
    }]
})

// Generating tokens
studSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token; // ye return hoke middleware ki tarah kaam krega btw collection and save in app.js
    } catch (e) {
        res.send(e);
    }
}

// Hashing
studSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // console.log(`password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(`password after is ${this.password}`);
        this.confirmpassword = await bcrypt.hash(this.password, 10);
    }
    next();
})


// Creating collection 
const Register = new mongoose.model("Register", studSchema);
module.exports = Register;