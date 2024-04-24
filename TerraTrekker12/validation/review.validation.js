const joi = require('joi');
const addReview = {
    body: joi.object().keys({
        name:joi.string().required(),
        email: joi.string().required(),
        review: joi.string().required(),
        companyName: joi.string().required()
    })
};
const updateReview = {
    body: joi.object().keys({
        email: joi.string().required(),
        newReview: joi.string().required()

    })
};
const deleteReview = {
    body: joi.object().keys({
        email: joi.string().required()
    })
};
module.exports = {
    addReview,
    updateReview,
    deleteReview
};