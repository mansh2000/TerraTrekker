const joi = require('joi');
const register = {
    body: joi.object().keys({
        email: joi.string().required(),
        fullName: joi.string().required(),
        password: joi.string().required(),
        phoneNo: joi.number().required(),
        address: joi.string().required()
    })

};
const login = {
    body: joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required()
    })
};
const logout = {
    body: joi.object().keys({
        email: joi.string().required()
    })
}
// const forgotpassword = {
//     body: joi.object().keys({
//         email: joi.string().required()
//     })
// };
const verfiryOtp = {
    body: joi.object().keys({
        email: joi.string().required(),
        otp: joi.number().required()
    })
}
const resetPassword = {
    body: joi.object().keys({
        email: joi.string().required(),
        newPassword: joi.string().required()
    })
};
module.exports = {
    register,
    login,
    logout,
    verfiryOtp,
    resetPassword
};