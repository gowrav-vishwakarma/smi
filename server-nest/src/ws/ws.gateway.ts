import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WsGateway implements OnGatewayInit, OnGatewayConnection {
  private logger: Logger = new Logger('WsGateway');

  @WebSocketServer() server: Socket;

  afterInit(server: any) {
    this.logger.log('WS Initialized');
  }

  handleConnection(@ConnectedSocket() client: Socket): void {
    this.logger.log(`WS Client connected: ${client.id}`);
    client.join(client.handshake.auth.username);
    this.logger.log(
      `WS Client connected username: ${client.handshake.auth.username}`,
    );
    client.emit('session', {
      username: client.handshake.auth.username,
    });
  }

  @SubscribeMessage('initiateCall')
  handleInitiateCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): void {
    this.server.to(payload.to).emit('ringing', payload);
  }

  @SubscribeMessage('acceptCall')
  handleAcceptCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): void {
    console.log('server Call Accepted');
    this.server.to(payload.to).emit('callAccepted', payload);
    // todo remove this emit to who accepted the call todo manage at client side
    this.server.to(payload.from).emit('callAccepted', payload);
  }

  @SubscribeMessage('disconnectCall')
  handleDisconnectCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): void {
    this.server.to(payload.to).emit('callDisconnected', payload);
  }

  @SubscribeMessage('denyCall')
  handleDenyCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): void {
    this.server.to(payload.to).emit('callDenied', payload);
  }
}
