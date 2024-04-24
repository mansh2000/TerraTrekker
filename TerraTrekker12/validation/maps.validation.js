const joi=require('joi');
const maps={
    body:joi.object().keys({
        address:joi.string().required()
    })
};
module.exports={maps};