import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3011)
export class TestGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() data: string) {
    this.server.sockets.emit('receive_message', 'Mysql boilerplate', data);
  }

  emitNotification(event: string, data: {}) {
    this.server.sockets.emit('custom_req', data);
  }
}
