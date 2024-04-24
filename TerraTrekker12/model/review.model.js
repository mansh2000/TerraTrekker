const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema({
    
    name:{
        type:String,
        require:true,
        trim:true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    review: {
        type: String,
        require: true
    },
    postDate: {
        type: Date,
        require: true
    },
    companyName: {
        type: String,
        require: true,
        trim: true
    }
});
const reviewModel = mongoose.model('review', reviewSchema);
module.exports = reviewModel