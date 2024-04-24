const express = require('express');

const userValidation = require('../validation/user.validation');
const authValidation = require('../validation/auth.validation');
const reviewValidation = require('../validation/review.validation');
const weatherValidation = require('../validation/weather.validation');
const mapValidation = require('../validation/maps.validation');


const userController = require('../controller/user.controller');
const businessController = require('../controller/business.controller');
const reviewController = require('../controller/review.controller');
const weatherController = require('../controller/weather.controller');
const mapController = require('../controller/maps.controller');
const paymentController = require('../controller/payment.controller');

const userAuthentication = require('../middleware/token');
const { isAdmin } = require('../middleware/role');

let router = express.Router();
const validator = require('../validation/index.validation')
/*-------------------------------Routes-------------------------------------*/
router.post('/register', validator(userValidation.register), userController.register);
router.post('/login', validator(userValidation.login), userController.login);
router.post('/logout', validator(userValidation.logout), userController.logout);
router.post('/forgotpassword', userController.forgotpassword);
router.post('/verifyotp', validator(userValidation.verfiryOtp), userController.verifyOtp);
router.put('/resetpassword', validator(userValidation.resetPassword), userController.resetPassword);
router.get('/paginate',userController.paginate);
/*------------------------------Business routes---------------------------------*/
router.post('/addBusiness', validator(authValidation.register), businessController.registerBusiness);
router.post('/loginBusiness', validator(authValidation.login), businessController.loginBusiness);
router.post('/updateBusiness', validator(authValidation.updateBusiness), userAuthentication, isAdmin('admin'), businessController.updateBusiness)
router.post('/deleteBusiness', validator(authValidation.logout), userAuthentication, isAdmin, businessController.logoutBusiness);
/*------------------------------Review routes-------------------------------------------*/
router.post('/addReview', validator(reviewValidation.addReview), reviewController.addReview);
router.post('/updateReview', validator(reviewValidation.updateReview), reviewController.updateReview);
router.post('/deleteReview', validator(reviewValidation.deleteReview), reviewController.deleteReview);
/*------------------------------------Weather route--------------------------*/
router.post('/addWeather', validator(weatherValidation.addWeather), weatherController.addWeather);
/*-------------------------------------Map route-------------------------------*/
router.post('/addMap', validator(mapValidation.maps), mapController.addMaps);
/*------------------------------------Payment route-------------------------*/
router.post('/addPayment', paymentController.createPayment);
router.get('/fetchPayment', paymentController.fetchPayment);
router.get('/refundPayment', paymentController.refundPayment);

module.exports = router;


