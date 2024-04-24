const mongoose = require('mongoose');
const otpSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true
    },
    otp: {
        type: Number,
        require: true
    },
    lastOtpSentTime: {
        type: Date,
    }
});
const otpModel = mongoose.model('otp', otpSchema);
module.exports = otpModel;