const Mailer = require("../utils/Mailer");
const {FeedBackReply} = require("../mail/templates/FeedBackReply");
const {FeedBackReceive} = require("../mail/templates/FeedBackReceive");
require("dotenv").config()

exports.contactUs = async (req, res) => {
    try {
        const {firstName, lastName, email, phoneNo, countryCode, message} = req.body

        if(!firstName || !lastName || !email || !phoneNo || !countryCode  || !message) {
            return res.status(403).json({
                success:false,
                message:"All fields are mandetory"
            }); 
        }
        
        
        const myMail = await Mailer(process.env.MAIL_USER, FeedBackReceive(firstName, lastName, email, message, phoneNo), `FeedBack By ${firstName}`);
        
        const userMail = await Mailer(email,FeedBackReply(firstName), "FeedBack Received || StudyNotion" );

        res.status(200).json({
            success:true,
            message:"Feedback received"
        })
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to send feedback"
        })
    }
}