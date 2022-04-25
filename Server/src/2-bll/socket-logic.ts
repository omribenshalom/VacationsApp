import { Server as HttpServer } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';

function socketLogic(httpServer: HttpServer): void {
  // Create socket server:
  const socketIoServer = new SocketIoServer(httpServer, {
    cors: { origin: 'http://localhost:3000' },
  });

  // socketIoServer.sockets is a collection containing all connected sockets.

  // 1. Listen to clients connections (client want to create a connection to the server):
  socketIoServer.sockets.on('connection', (socket: Socket) => {
    console.log('Client has been connected to socket.');

    // 3. Listen to client messages:
    socket.on('vacations-change', () => {
      console.log('Socket-Logic. Admin Changed somthing.');

      // Send back the message to all sockets:
      socketIoServer.sockets.emit('refresh-vacations');
    });

    // Listen to client disconnect:
    socket.on('disconnect', () => {
      console.log('Client has been disconnect from socket.');
    });
  });
}

export default socketLogic;
