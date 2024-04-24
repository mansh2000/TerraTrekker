const CatchAsync = require('../utils/CatchAsync');
const mapsService=require('../services/maps.service')
const addMaps=CatchAsync(async(req,res)=>{
    const user=await mapsService.addMap(req);
    return res.status(200).send(user);
})
module.exports={addMaps};