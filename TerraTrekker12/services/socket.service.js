const http = require('http');
const socketIo = require('socket.io');
const app = require('../app');

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
  });
let sockets = [];
io.on('connection', function (socket) {
    sockets.push(socket);

    socket.on('message', function (msg) {
        console.log('msg', msg);
        socket.emit('data', 909099999)
    });
    
    socket.on('close', function () {
        sockets = sockets.filter(s => s !== socket);
    });
});
module.exports = { server };