const axios = require('axios');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const environment = require('../config/environment');
const addMap= async (req) => {
  try {
    const { address } = req.body;
    const apiKey = environment.mapsKey; 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const response = await axios.get(url);
    return(response.data);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'error sending data');
  }
};
module.exports={addMap};