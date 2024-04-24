const businessModel = require('../model/business.model');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');
const saltOrRounds = 10;
const httpStatus = require('http-status');

const addBusiness = async (req) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltOrRounds);
  return businessModel.create({ ...req.body, password: hashedPassword });
};
const loginBusiness = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || !password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};
const deleteBusiness = async (req) => {
  const { email, token } = req;
  try {
    const user = await businessModel.deleteOne({ email });
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
  };
};
const updateBusiness = async (req) => {
  const { email, newcompanyName } = req;
  const user = await businessModel.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "please enter valid email id to update your details");
  }
  user.companyName = newcompanyName;
  await user.save();
  return (user)
};
const getUserByEmail = async (email) => {
  return businessModel.findOne({ email });
};
module.exports = {
  addBusiness,
  loginBusiness,
  deleteBusiness,
  updateBusiness,
  getUserByEmail
};