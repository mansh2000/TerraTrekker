const CatchAsync = require('../utils/CatchAsync');
const reviewService = require('../services/review.service');

const addReview = CatchAsync(async (req, res) => {
    const user = await reviewService.addReview(req.body);
    return res.status(200).send(user);
});
const updateReview = CatchAsync(async (req, res) => {
    const user = await reviewService.updateReview(req.body);
    return res.status(200).send(user);
});
const deleteReview = CatchAsync(async (req, res) => {
    const user = await reviewService.deleteReview(req.body);
    return res.status(200).send(user);
});
module.exports = {
    addReview,
    updateReview,
    deleteReview
};