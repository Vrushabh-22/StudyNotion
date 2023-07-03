const linkTemplate = require('../mail/templates/passwordResetLink.jsx')
const passwordUpdated = require("../mail/templates/passwordUpdate")
const User = require("../models/User");
const Mailer = require("../utils/Mailer");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");


exports.resetToken = async (req, res) => {
    try {
        //fetch data
        const {email} = req.body;

        //validation
        if(!email){
            return res.status(400).json({
                success:false,
                message:"All fields are mandetory"
            });
        }

        //check for user existance
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(403).json({
                success:false,
                message:"Not a valid user"
            });
        }

        const token = crypto.randomUUID();

        //update user with this token and expiry time
        const updateUser = await User.findOneAndUpdate({email}, {token,tokenExpires:Date.now()+3600000}, {new:true})

        //creating a reset front-end link 
        const url = `http://localhost:3000/reset-password/${token}`

        //sending a mail
        const mail = await Mailer(email, linkTemplate(url),"Password Reset Link || By StudyNotion");

        res.status(200).json({
            success:true,
            message:"Reset Link Sent Successfully",
            updateUser
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed While sending reset link"
        });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        //fetch data
        const {token, newPassword, confirmNewPassword} = req.body;

        //validation
        if(!token || !newPassword || !confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are mandetory"
            });
        }

        //check confirm pass
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not match"
            });
        }

        //get user by token 
        const user = await User.findOne({token});

        //verify token -> if no user found means invalid token
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid token"
            });
        }

        //check token expiry
        if(user.resetTokenExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token expired"
            });
        }

        //hashing newPass
        const hashPass = await bcrypt.hash(newPassword, 10);

        //updating password
        const response = await User.findOneAndUpdate({token}, {password:hashPass}, {new:true});

        const mail = await Mailer(user.email, passwordUpdated(user.email, `${user.firstName} ${user.lastName}`), "Reset Password Successful || StudyNotion")

        res.status(200).json({
            success:true,
            message:"Password Updated"
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to update passwowrd"
        });
    }
}