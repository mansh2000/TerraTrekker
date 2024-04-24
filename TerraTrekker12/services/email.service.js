const nodemailer = require('nodemailer');
const otpModel = require('../model/otp.model');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const userModel= require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const environment = require('../config/environment');
const tokenService = require('../services/token.service');
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000)
}

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'waliamanshu17@gmail.com',
        pass: environment.password
    }
});
const sendEmail = async (req) => {
    const { email } = req.body;
    otp = generateOTP();
    console.log("otp is ",otp);
    const timestamp = Date.now();
    lastOtpSentTime = timestamp;
    otp[email] = { otp, timestamp };
    const token = await tokenService.generateToken(req.body);
    try {
        const user = await transport.sendMail({
            from: 'waliamanshu17@gmail.com',
            to: email,
            subject: "your otp because you forgot your password you dumb bimbo ",
            html: `your otp for resetting password is :${otp},
             and the link for resetting password is ${token}`
        });
        console.log("user is ",user);
        await otpModel.create({
            email,
            otp,
            lastOtpSentTime,
        })
        console.log("usersssssss",user);
        return user;

    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    };
};
const verifyOtp = async (req) => {
    try {
        const { email, otp } = req;
        const user = await otpModel.findOne({ email, otp });
        if(!email || !otp){
            throw new ApiError(httpStatus.BAD_REQUEST, 'please enter email and password');
        }
        if (otp !== user.otp) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'please provide correct otp');
        }
            await otpModel.deleteOne({ email });
            return 'otp verified successfully';
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
};
const resetPassword=async(req)=>{
    const{email,newPassword}=req;
    const user=await userModel.findOne({email});
    if(!user){
        throw new ApiError(httpStatus.BAD_REQUEST, 'please enter a valid id');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();
    return(user);
}
module.exports = {
    transport,
    sendEmail,
    verifyOtp,
    resetPassword
};