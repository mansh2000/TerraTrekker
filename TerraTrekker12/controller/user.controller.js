const catchAsync = require('../utils/CatchAsync');
const userModel = require('../model/user.model');
const userService = require('../services/user.service');
const httpStatus = require('http-status');
const emailService = require('../services/email.service');
const tokenService = require('../services/token.service');

const register = catchAsync(async (req, res) => {
  const userCreated = await userService.createUser(req);
  return res.status(201).send(userCreated);
});
const login = catchAsync(async (req, res) => {
  const { email, password, userType } = req.body;
  const user = await userService.loginUser(email, password);
  const tokens = await tokenService.generateToken(req.body);
  res.status(httpStatus.OK).send({ user, tokens });
  const createUser = await userModel.create({ email, token: generatetoken })
  return res.status(200).json(createUser);
});
const logout = catchAsync(async (req, res) => {
  const user = await userService.logout(req.body);
  return res.status(200).json(user);
});
const forgotpassword = catchAsync(async (req, res) => {
  const user = await emailService.sendEmail(req);
  const tokens = await tokenService.generateToken(req.body);
  res.status(httpStatus.OK).send({ tokens });
  return res.status(200).json(user);
});
const verifyOtp = catchAsync(async (req, res) => {
  const user = await emailService.verifyOtp(req.body);
  return res.status(200).send(user);
});
const resetPassword = catchAsync(async (req, res) => {
  const user = await emailService.resetPassword(req.body);
  return res.status(200).send(user);
});
const paginate = catchAsync(async (req, res) => {
  const user = await userService.paginate(req.query);
  return res.status(200).send(user);
});



module.exports = {
  register,
  login,
  logout,
  forgotpassword,
  verifyOtp,
  resetPassword,
  paginate
};