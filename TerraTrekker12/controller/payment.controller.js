const CatchAsync = require('../utils/CatchAsync');
const { addPayment } = require('../services/payment.service');

const createPayment = async (req, res) => {
    console.log('req12', req.body);
    const user = await addPayment(req);
    return res.status(200).send(user);
};
const fetchPayment = CatchAsync(async (req, res) => {
    const user = await paymentService.fetchPayment(req);
    return res.status(200).send(user);
})
const refundPayment = CatchAsync(async (req, res) => {
    const user = await paymentService.refundPayment(req.body);
    return res.status(200).send(user);
})
module.exports = {
    createPayment,
    fetchPayment,
    refundPayment
};