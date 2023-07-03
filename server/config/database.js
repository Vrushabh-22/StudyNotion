require("dotenv").config()
const mongoose = require("mongoose");

const URL = process.env.DATABASE_URL

const dbConnect = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Db Connection Successful");
    } catch (error) {
        console.log(error.message);
        console.log("Db Connection Unsuccessful");
    }
}

module.exports = dbConnect;