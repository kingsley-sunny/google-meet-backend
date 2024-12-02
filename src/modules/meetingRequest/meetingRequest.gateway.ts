import { Inject, UseFilters } from '@nestjs/common';
import {} from '@nestjs/platform-socket.io';
import {
  BaseWsExceptionFilter,
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
import { RemoteSocket, Server, Socket } from 'socket.io';
import {
  DecorateAcknowledgementsWithMultipleResponses,
  DefaultEventsMap,
} from 'socket.io/dist/typed-events';
import { ISocketMeetingUser } from '../../base/base.interface';
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

  @UseFilters(new BaseWsExceptionFilter())
  @SubscribeMessage('/meeting-request/create')
  async handleMeetingRequests(
    @MessageBody('') data: ISocketMeetingUser,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const meeting = await this.meetingService.findById(data.meeting_id);
      console.log('🚀 ~~ meeting:', meeting);
      client.join(`${meeting.id}:room`);
      (client as any).metadata = { ...data, socket_id: client.id };

      if (data.user_id === meeting.user_id) {
        const meetingUsersSockets = await this.server.sockets
          .in(`${meeting.id}:room`)
          .fetchSockets();

        const meetingUsers = meetingUsersSockets.map(
          (userSocket: any) => userSocket.metadata,
        );
        console.log('🚀 ~~ meetingUsers:', meetingUsers);

        this.server
          .to(data.socket_id)
          .emit(`/meeting-request/${meeting.id}/update`, {
            message: 'request accepted',
            data: {
              accepted: true,
              meetingToken: meeting.token,
              user: { ...data, token: data.meeting_token },
              users: meetingUsers,
            },
          });

        return BaseService.transformResponse(meeting, 'Awaiting Requests');
      }

      // join the room
      client.join(`${data.meeting_id}:requests`);
      (client as any).metadata = { ...data, socket_id: client.id };

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
    } catch (error) {
      console.log(error);
      throw new WsException(error.message);
    }
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

  @UseFilters(new BaseWsExceptionFilter())
  @SubscribeMessage('/meeting-requests/update')
  async handleUpdateMeetingRequest(
    @MessageBody('')
    data: {
      meeting_id: string;
      socket_id: string;
      user: ISocketMeetingUser;
      action: 'accept' | 'reject';
    },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('🚀 ~~ data:', data);

    const sockets = await this.server.sockets
      .in(`${data.meeting_id}:requests`)
      .fetchSockets();

    const requests = sockets.map((socket: any) => socket.metadata);

    const meetingRequestUser = requests.find(
      (req) => req.socket_id === data.socket_id,
    );
    const meeting = await this.meetingService.findById(data.meeting_id);

    if (!meetingRequestUser) {
      throw new WsException('Meeting Requests not found');
    }
    console.log((await this.server.fetchSockets()).map((s) => s.id));
    console.log(client.id, data.socket_id);

    if (data.action === 'accept') {
      // fetch all the users in the meeting room
      const requesterSocket = sockets.find(
        (socket) => socket.id === meetingRequestUser.socket_id,
      ) as RemoteSocket<
        DecorateAcknowledgementsWithMultipleResponses<DefaultEventsMap>,
        any
      >;

      // leave the request rooom
      requesterSocket.leave(`${meeting.id}:requests`);

      // add the requester to the room
      requesterSocket?.join(`${meeting.id}:room`);

      const meetingUsersSockets = await this.server.sockets
        .in(`${meeting.id}:room`)
        .fetchSockets();

      const meetingUsers = meetingUsersSockets.map(
        (userSocket: any) => userSocket.metadata,
      );
      console.log('🚀 ~~ meetingUsers:', meetingUsers);

      this.server
        .to(`${meeting.id}:room`)
        .emit(`/meeting-request/${meeting.id}/update`, {
          message: 'request accepted',
          data: {
            accepted: true,
            meetingToken: meeting.token,
            users: meetingUsers,
          },
        });

      return BaseService.transformResponse(
        meetingRequestUser,
        'Awaiting Requests',
      );
    }

    if (data.action === 'reject') {
      client.broadcast
        .to(data.socket_id)
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
