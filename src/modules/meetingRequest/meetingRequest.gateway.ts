import { Inject } from '@nestjs/common';
import {} from '@nestjs/platform-socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BaseService } from '../../base/base.service';
import { MeetingService } from '../meeting/meeting.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class MeetingRequestGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @Inject(MeetingService)
  meetingService: MeetingService;
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    // console.log('server', server);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('client', client.id);
  }

  handleDisconnect(client: any) {
    console.log('this client has disconnect', client.id);
  }

  @SubscribeMessage('/meeting-request/create')
  async handleMeetingRequests(
    @MessageBody('') data: any,
    @ConnectedSocket() client: Socket,
  ) {
    // join the room
    client.join(`${data.meeting_id}:requests`);
    (client as any).metadata = { ...data, socketId: client.id };

    // send the notification to the user
    const meeting = await this.meetingService.findById(data.meeting_id);

    this.server.emit(
      `/meeting-request/${meeting.id}/${meeting.user_id}/create`,
      {
        message: 'A new Request to join the meeting',
        data: {
          ...data,
          socketId: client.id,
        },
      },
    );

    return {
      ...data,
      socketId: client.id,
    };
  }

  @SubscribeMessage('/meeting-requests/get')
  async handleGetMeetingRequest(
    @MessageBody('') data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const sockets = await this.server.sockets
      .in(`${data.meeting_id}:requests`)
      .fetchSockets();

    const requests = sockets.map((socket: any) => socket.metadata);

    const meeting = await this.meetingService.findById(data.meeting_id);

    this.server.emit(`/meeting-request/${meeting.id}/${meeting.user_id}/get`, {
      message: 'All meeting requests',
      data: {
        requests,
      },
    });

    return BaseService.transformResponse(requests, 'Awaiting Requests');
  }

  @SubscribeMessage('/meeting-requests/update')
  async handleUpdateMeetingRequest(
    @MessageBody('')
    data: {
      meeting_id: string;
      socket_id: string;
      action: 'accept' | 'reject';
    },
    @ConnectedSocket() client: Socket,
  ) {
    const sockets = await this.server.sockets
      .in(`${data.meeting_id}:requests`)
      .fetchSockets();

    const requests = sockets.map((socket: any) => socket.metadata);

    const meetingRequestUser = requests.find(
      (req) => req.socketId === data.socket_id,
    );
    const meeting = await this.meetingService.findById(data.meeting_id);

    if (!meetingRequestUser) {
      throw new WsException('Meeting Requests not found');
    }
    console.log((await this.server.fetchSockets()).map((s) => s.id));
    console.log(client.id, data.socket_id);

    if (data.action === 'accept') {
      client.broadcast // .to(data.socket_id)
        .emit(`/meeting-request/${meeting.id}/update`, {
          message: 'request accepted',
          data: {
            accepted: true,
            meetingToken: meeting.token,
          },
        });

      return BaseService.transformResponse(
        meetingRequestUser,
        'Awaiting Requests',
      );
    }

    if (data.action === 'reject') {
      client.broadcast
        // .to(data.socket_id)
        .emit(`/meeting-request/${meeting.id}/update`, {
          message: 'request rejected',
          data: {
            accepted: false,
            meetingToken: null,
          },
        });
    }

    return BaseService.transformResponse(meetingRequestUser, 'meeting request');
  }

  @SubscribeMessage('fuck')
  async handleFuck(
    @MessageBody('') data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('🚀 ~~ data:', data);

    client.broadcast.emit('fuck-response', data);

    return { message: 'fuck' };
  }
}
