const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');
const User = require('../models/userModel');

// emailInput Take route for change password...
router.get('/changePassword', (req, res)=>{
    res.render("emailInput.ejs");
});

// send email Route...
router.post('/sendMail', async(req, res)=>{
    // set this sendMail otp as null...
    // const updatedUser = await User.findOneAndUpdate(
    //     { email: req.body.email }, // Filter: find user by email
    //     { otp: "....." }, // Update: set the new OTP
    //     { new: true } // Options: return the updated document
    // );

    // res.send(req.body.email);
    // first send mail 
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        // host: "smtp.ethereal.email",
        // service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    function generateRandomString() {
        const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 6; i++) {
            randomString += s.charAt(Math.floor(Math.random() * s.length));
        }
        return randomString;
    }
    const otp = generateRandomString();
    console.log("Generated Random String:", otp);
    // req.locals.OTP = otp;
    // console.log(req.)

    const updatedUser = await User.findOneAndUpdate(
        { email: req.body.email }, // Filter: find user by email
        { otp: otp }, // Update: set the new OTP
        { new: true } // Options: return the updated document
    );
    
    const toEmail = req.body.email;
    // const toEmail = "azizurcsebsmrstu@gmail.com" ;
    console.log(req.body.email, process.env.EMAIL_USERNAME);
    const mailOptions = {
        from: process.env.EMAIL_USERNAME, // Sender address
        to: toEmail, // List of recipients
        subject: 'Password Reset OTP', // Subject line
        text: `Your OTP code is ${otp}` // Plain text body
    };
    
    transport.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log("error is => " + err.message);
        } else {
            console.log("send mail successfully!");
        }
    });


    // then otp input form render...
    res.render("OTPtakenForm.ejs");
});

router.post("/verifyOTP", async(req, res)=>{
    console.log(req.body.otp, req.body.email);
    // res.send(req.body.otp);
    let user = await User.findOne({email: req.body.email});
    console.log(user);
    // const otp = req.body.otp;
    if (req.body.otp == user.otp) {
        res.render("changePassword.ejs");
    }
    else {
        res.redirect('/user/changePassword');
    }
});

router.post("/changepass", async(req, res)=>{
    const updatedUser = await User.findOneAndUpdate(
        { email: req.body.email }, // Filter: find user by email
        { password: req.body.password }, // Update: set the new OTP
        { new: true } // Options: return the updated document
    );
    return res.send(updatedUser);
    // res.send("updated password");
})

module.exports = router;
