const jwt = require('jsonwebtoken');
const environment = require('../config/environment');
const userModel = require('../model/user.model');
const secret = environment.jwtSecretKey;
const expiresIn = '30min';
const generateToken = async (req) => {
  const user = await userModel.findOne({ email: req.email });
  const payload = {
    email: req.email,
    type: req.type,
  };
  return jwt.sign(payload, secret, { expiresIn });
};

module.exports = {
  generateToken
};

