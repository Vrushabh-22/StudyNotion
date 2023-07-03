require("dotenv").config();
const nodemailer = require("nodemailer");

const Mailer = async (email,body,title) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from: "Study Notion || By - Vrushabh",
            to: email,
            subject: title, 
            html: body,
        });

    } catch (error) {
        console.log(error);
        console.log("Failed to send mail");
    }
}


module.exports = Mailer;