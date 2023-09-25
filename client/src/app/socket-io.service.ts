import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
const backendUrl = "ws://localhost:3500";

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private clientSocket: any;
  constructor() { 
    this.clientSocket = socketIo.io(backendUrl);
  }

  listenToServer(): Observable<string>{
    return new Observable((subscribe) => {
      this.clientSocket.on("message", (message: string) => {
        subscribe.next(message);
      })
    })
  }

  emitToServer(message: string): void {
    this.clientSocket.emit('message', message);
  }

}
