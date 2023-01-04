const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`).then(() => {
    console.log(`connection success`);
}).catch((e) => {
    console.log(`${e}no connection`);
})