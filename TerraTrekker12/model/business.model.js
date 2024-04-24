const mongoose = require('mongoose');
const businessSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    ownerName: {
        type: String,
        require: true,
        trim: true
    },
    companyName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    type: {
        type: String,
        require: true,
        default: 'null'
    },
    location: {
        type: String,
        require: true

    },
    cost: {
        type: Number,
        require: true

    },
    role:{
        type:String
    }
});
const businessModel = mongoose.model('business', businessSchema);
module.exports = businessModel;