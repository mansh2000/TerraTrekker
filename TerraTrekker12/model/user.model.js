const { number } = require('joi');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        require: true,
        trim: true
    },
    phoneNo: {
        type: Number,
        require: true,
        trim: true
    },
    address: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['owner', 'user'],
        default: 'user'
    }
});
userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
userModel.paginate().then({});