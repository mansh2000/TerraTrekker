const joi=require('joi');
const addWeather = {
    body: joi.object().keys({
       city:joi.string().required()
    })
};
module.exports={addWeather};