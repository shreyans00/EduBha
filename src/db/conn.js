const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/stud_regis").then(() => {
    console.log(`connection success`);
}).catch((e) => {
    console.log(`${e}no connection`);
})