require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const cloudinaryConnect = async () => {
    try {
        await cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        console.log("Cloudinary Connection Successful");
    } catch (error) {
        console.log(error.message);
        console.log("Cloudinary Connection Failed");
    }
}

module.exports = cloudinaryConnect;