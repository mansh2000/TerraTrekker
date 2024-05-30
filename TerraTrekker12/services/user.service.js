const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
//const logger=require('../config/logger');
const saltOrRounds = 10;
const createUser = async (req) => {
    //logger.info(`userBody data ======>`, req.body);
    if(await userModel.isEmailTaken(req.body.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    if (await userModel.isPhoneNumberTaken(req.body.phoneNo)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'PhoneNumber already taken');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltOrRounds);
    return userModel.create({ ...req.body, password: hashedPassword })
};
const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || !password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};
const logout = async (req) => {
  const { email, token } = req;
  try {
    const user = await userModel.deleteOne({ email, token });
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
  };
};
const getUserByEmail = async (email) => {
  return userModel.findOne({ email });
};
const paginate = async (userModel, req) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;

  try {
    const offset = (page - 1) * pageSize;
    const limit=20;
    const users = await userModel.paginate({_id:req.query}, {options: {offset,limit}});

    return {
      page,
      totalPages,
      users
    };
  } catch (error) {
    throw new Error('Failed to paginate users: ' + error.message);
  }
};
// const changePassword = async (req) => {
//   try {
//     const { currentPassword, newPassword, confirmPassword, userType } = req.body;
//     const userId = req.user;
//     const user = userType === 'user' ? await User.findOne({ _id: userId }) : await Driver.findOne({ _id: userId });
//     if (!user) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
//     }
//     if (!(await user.isPasswordMatch(currentPassword))) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Current password does not match');
//     }
//     if (newPassword !== confirmPassword) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'New password and confirm password do not match');
//     }
//     const updatedUser =
//       userType === 'user'
//         ? await userService.updateUserById(userId, { password: newPassword })
//         : await driverService.updateDriverById(userId, { password: newPassword });
//     return updatedUser;
//   } catch (err) {
//     throw new ApiError(httpStatus.BAD_REQUEST, err.message);
//   }
// };
module.exports = {
  createUser,
  loginUser,
  getUserByEmail,
  logout,
  paginate,
  //changePassword
};