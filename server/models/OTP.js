const mongoose = require("mongoose");
const Mailer = require("../utils/Mailer");
const otpTemplate = require("../mail/templates/emailVerificationTemplate")

const otpSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
    },
    otp: {
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default: Date.now(),
        expires: 60 * 5,
    }
});


//OTP Verification mail sender function
const OTPVerificationMail = async (email, otp) => {
    try {
        const body = otpTemplate(otp)
        const response = await Mailer(email, body, "OTP Verification || By StudyNotion");
        console.log("Verification mail send successfully");
    } catch (error) {
        console.log(error.message);
        console.log("Error While Sending OTP Verification Mail");
    }
}

//Pre-Post Middlewares
otpSchema.pre("save", async function (next) {
	await OTPVerificationMail(this.email, this.otp);
    next();
});


module.exports = mongoose.model("OTP", otpSchema);