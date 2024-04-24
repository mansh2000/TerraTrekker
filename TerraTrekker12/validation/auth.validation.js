const joi = require('joi');
const register = {
    body: joi.object().keys({
        email: joi.string().required(),
        name: joi.string().required(),
        phone: joi.number().required(),
        address: joi.string().required(),
        password: joi.string().required(),
        type: joi.string().required(),
        cost: joi.number().required(),
        ownerName: joi.string().required(),
        companyName: joi.string().required()
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
};
const updateBusiness = {
    body: joi.object().keys({
        email: joi.string().required(),
        newcompanyName: joi.string().required()
    })
};
module.exports = {
    register,
    login,
    logout,
    updateBusiness
};