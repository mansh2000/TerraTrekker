const payment = require('../model/payment.model');
const environment = require('../config/environment');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const Razorpay = require('razorpay');
const paymentModel = require('../model/payment.model');
const razorpay = new Razorpay({
  key_id: 'rzp_test_CtOaODOHIvu9ZL',
  key_secret: 'qB5GUuywsOI0RJ7gA4lfcIKI'
});
const addPayment = async (req) => {
  const { amount, userName, email, bankName } = req.body;

  const options = {
    amount: amount,
    currency: 'INR',
    receipt: 'order_rcptid_11',
    payment_capture: 1
  };
  console.log('options12', options);
  const order = await razorpay.orders.create(options);
  console.log('order12', order);
  const createuser = await payment.create({
    userName,
    email,
    amount,
    bankName,
    dateofPayment: Date.now()
  })
  return ({
    message: 'Payment created successfully',
    order: order.id,
  });
};
const fetchPayment = async (req, res) => {
  const { order_id } = req;
  let paymentData = await razorpay.payments.fetch(order_id);
  const payment = paymentMapper(paymentData);
  const paymentCreated = await paymentModel.create(payment);
  return res.status(200).send(paymentCreated);
};
const refundPayment = async (req) => {
  try {
    const { amount, order_id } = req;
    const refund = await razorpay.refunds.create(order_id, { amount: amount, speed: 'normal' });
    return (refund);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
  }
};

module.exports = { addPayment, fetchPayment, refundPayment };
