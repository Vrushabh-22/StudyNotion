// Creating an app
const express = require("express");
const app = express();


//imports
require("dotenv").config();
const dbConnect = require("./config/database");
const cloudinaryConnect = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');

//importing routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/course");
const paymentRoutes = require("./routes/payment")

//Variables
const PORT = process.env.PORT || 4001

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

//mounting routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);

//cloudinary and DB connnections
dbConnect();
cloudinaryConnect();

//default route
app.get("/" , (req, res) => {
    res.json({
        success:true,
        message:"Working"
    });
})

//Server Activated
app.listen(PORT, () => {
    console.log(`App is running on port : ${PORT}`);
});
