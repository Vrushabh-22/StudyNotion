require("dotenv").config();
const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const { otpGen } = require('otp-gen-agent');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mailer = require("../utils/Mailer");
const passwordUpdated = require("../mail/templates/passwordUpdate");



//completed
exports.sendOTP = async (req, res) => {
    try {
        const {email} = req.body;

        const existingUser = await User.findOne({email});


        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User Already Exits"
            });
        }

        const otp = await otpGen();


        const response = await OTP.create({
            email, otp
        });

        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            response
        });

    } catch (error) {
        console.log(error.message);
        console.log("Error While Generating OTP");
    }
}


//completed
exports.signUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            role,
            otp
        } = req.body

        if(!firstName || !lastName || !email || !password ||!confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are mandetory"
            });
        }
        
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password Do Not Matched"
            });
        }

        const exstingUser = await User.findOne({email});

        if(exstingUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exists"
            });
        }

        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP expired"
            })
        } else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            });
        }

        const profile = await Profile.create({
            gender:null,
            about:null,
            dateOfBirth:null,
        })


        const hashPass = await bcrypt.hash(password, 10);


        await User.create({
            firstName,
            lastName,
            email,
            password: hashPass,
            role,
            profile:profile._id,
            profileImage:`https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}` 
        });

        res.status(200).json({
            success:true,
            message:"User Created Successfully"
        });

    } catch (error) {
        console.log(error.message);
        console.log("Error While SignUp");
        res.status(404).json({
            success:false,
            message:"Creating User Failed"
        });
    }
}


//completed
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are mandetory"
            });
        }

        const existingUser = await User.findOne({email}).populate("profile").populate("courses").exec();

        const profile = existingUser.profile
        const enrolledCourses = existingUser.courses

        if(!existingUser) {
            return res.status(401).json({
                success:false,
                message:"Please SignUp"
            });
        }

        const matched = await bcrypt.compare(password, existingUser.password)

        if(!matched){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password"
            });
        }

        const payload = {
            id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h"
        }); 


        existingUser.token = token;
        existingUser.password = undefined;

        res.status(200).cookie("token", token, {
            expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000 ),
            httpOnly:true
        }).json({
            success:true,
            message:"Logged In Successfully",
            existingUser,
            profile,
            enrolledCourses
        });

    } catch (error) {
        console.log(error.message);
        console.log("Login failed");
        res.status(404).json({
            success:false,
            message:"Failed to login"
        });
    }
}


//completed
exports.changePass = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword ){
            return res.status(403).json({
                success:false,
                message:"All field are mandatory"
            });
        }

        const {id} = req.user;

        const user = await User.findById(id);

        const matched = await bcrypt.compare(oldPassword, user.password)

        if(!matched){
            return res.status(400).json({
                success:false,
                message:"Invalid Password"
            });
        }

        const hashPass = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(id, {password: hashPass}, {new:true})

        await Mailer(user.email, passwordUpdated(user.email, `${user.firstName} ${user.lastName}`), "StudyNotion || Update-Password");

        res.status(200).json({
            success:true,
            message:"Password Updated"
        });
    } catch (error) {
        console.log(error.message);
        console.log("Error while updating password");
        res.status(404).json({
            success:false,  
            message:"Can't Update Password"
        });
    }
}

