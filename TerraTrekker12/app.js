const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes/auth.route');
// const expressWinston=require('express-winston');
// const logger=require('./config/logger');
// const winston = require('winston/lib/winston/transports');
// app.use(expressWinston.logger({
//     winstonInstance:logger,
//     statusLevel:true
// }));
const app = express();
app.use(bodyParser.json());
app.use('/api', router);
app.use(express);
module.exports = app;