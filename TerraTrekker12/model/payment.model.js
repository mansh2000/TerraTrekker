const mongoose=require('mongoose');
const paymentSchema=mongoose.Schema({
    email: {
        type: String
    },
    currency: {
        type: String
    },
    dateofPayment: {
        type: Date
    },
    bankName: {
        type: String
    },
    userName: {
        type: String
    },
    amount: {
        type: Number
    }
});
const paymentModel=mongoose.model('payment',paymentSchema);
module.exports=paymentModel;