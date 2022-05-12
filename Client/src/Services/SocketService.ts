import { io, Socket } from "socket.io-client";
import config from "../Utils/Config";
import vacationService from "./VacationsService";

class SocketService {
  private socket: Socket;

  public connect(): void {
    this.socket = io(config.appUrl);

    this.socket.on("refresh-vacations", () => {
      
      console.log("-------------------------");
      console.log("--- refresh VACATIONS ---");
      console.log("-------------------------");

      vacationService.getVacationsRefresh();
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public vacationsChange(): void {
    this.socket.emit("vacations-change");
  }
}

const socketService = new SocketService();

export default socketService;
