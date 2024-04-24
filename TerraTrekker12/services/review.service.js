const reviewModel = require('../model/review.model');
const ApiError = require('../utils/ApiError');
const userModel = require('../model/user.model');
const httpStatus = require('http-status');

const addReview = async (req) => {
  const { name,email, review, companyName } = req;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'please enter your email to post a review');
  }
  const postDate = Date.now();
  const createuser = await reviewModel.create({ name, email, companyName, postDate, review });
  return (createuser);
};
const updateReview = async (req) => {
  const { email, newReview } = req;
  const user = await reviewModel.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'please enter your email to update your review');
  }
  user.review = newReview;
  const createuser=await reviewModel.updateOne({email});
  return (createuser);
};
const deleteReview=async(req)=>{
  const {email}=req;
  const user=await reviewModel.findOne({email});
  if(!user){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'please enter your email to delete your review');
  }
  const createuser=await reviewModel.deleteOne({email});
  return (createuser);
};
module.exports = {
  addReview,
  updateReview,
  deleteReview
};
