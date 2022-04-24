import { io, Socket } from 'socket.io-client';
import vacationService from './VacationsService';

class SocketService {
  private socket: Socket;

  public connect(): void {
    this.socket = io('http://localhost:7070');

    this.socket.on('refresh-vacations', () => {
      
        console.log("-------------------------");
        console.log("refresh VACATIONS");
        console.log("-------------------------");
        
        vacationService.getVacations(true);
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public vacationsChange(): void {
    this.socket.emit('vacations-change');
  }
}

const socketService = new SocketService();

export default socketService;
