require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "" )

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            });
        }

        const verify = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = verify;

        next();

    } catch (error) {
        console.log(error.message);
        console.log("Error while verify token");
        res.status(404).json({
            success:false,
            message:"Error token verification"
        });
    }
}

exports.isStudent = (req, res, next) => {
    
    const {role} = req.user;

    if(role !== "Student"){
        return res.status(401).json({
            success:false,
            message:"User is not a student"
        });
    }
    
    next();
}

//isInstructor
exports.isInstructor = (req, res, next) => {
    
    const {role} = req.user;

    if(role !== "Instructor"){
        return res.status(401).json({
            success:false,
            message:"User is not a Instructor"
        });
    }
    
    next();
}

//isAdmin

exports.isAdmin = (req, res, next) => {
    
    const {role} = req.user;

    if(role !== "Admin"){
        return res.status(401).json({
            success:false,
            message:"User is not a Admin"
        });
    }
    
    next();
}