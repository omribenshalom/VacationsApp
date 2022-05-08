"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
function socketLogic(httpServer) {
    // Create socket server:
    var socketIoServer = new socket_io_1.Server(httpServer, {
        cors: { origin: 'http://localhost:3000' },
    });
    // socketIoServer.sockets is a collection containing all connected sockets.
    // 1. Listen to clients connections (client want to create a connection to the server):
    socketIoServer.sockets.on('connection', function (socket) {
        console.log('Client has been connected to socket.');
        // 3. Listen to client messages:
        socket.on('vacations-change', function () {
            console.log('Socket-Logic. Admin Changed somthing.');
            // Send back the message to all sockets:
            socketIoServer.sockets.emit('refresh-vacations');
        });
        // Listen to client disconnect:
        socket.on('disconnect', function () {
            console.log('Client has been disconnect from socket.');
        });
    });
}
exports.default = socketLogic;
