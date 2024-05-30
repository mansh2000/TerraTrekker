const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const socketIO = require('socket.io');
const { server } = require('./services/socket.service');

app.use(bodyParser.json());
const port = 8000;
const environment = require('./config/environment');

mongoose.connect(environment.mongodbUri, 
).then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log(err.message);
})
server.listen(port, () => {
    console.log(`server running on port${port}`);
})
