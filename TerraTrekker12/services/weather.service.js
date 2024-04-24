const axios = require('axios');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const environment = require('../config/environment');
const apiKey=environment.weatherKey;
const getWeather=async(req)=>{
    try{
        const{city}=req.body;
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        return response.data;
    }catch(error){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'error getting weather data');
    }
}

module.exports = { getWeather };
