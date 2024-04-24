const weatherService=require('../services/weather.service');
const CatchAsync = require('../utils/CatchAsync');
const addWeather=CatchAsync(async(req,res)=>{
    const user=await weatherService.getWeather(req);
    return res.status(200).send(user);
})
module.exports={addWeather}