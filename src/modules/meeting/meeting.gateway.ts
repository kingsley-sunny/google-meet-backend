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
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MeetingService } from '../meeting/meeting.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class MeetingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @Inject(MeetingService)
  meetingService: MeetingService;
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    console.log('server', server);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('client', client.id);
  }

  handleDisconnect(client: any) {
    console.log('this client has disconnect', client.id);
  }

  @SubscribeMessage('/meeting/join')
  async handleJoinMeeting(
    @MessageBody('')
    data: {
      meeting_token: string;
      user_id: string;
      peer_id: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const meeting = await this.meetingService.findByToken(data.meeting_token);

    // if there is not peerId, emit an error and return
    if (!data.peer_id) {
      this.server.to(client.id).emit(`/meeting/${meeting.id}/join`, {
        data: {
          accepted: false,
          error: true,
        },
        message: 'No Peer Id',
      });

      return {
        ...data,
        socketId: client.id,
      };
    }

    if (!data.user_id && data.meeting_token !== meeting.token) {
      this.server.to(client.id).emit(`/meeting/${meeting.id}/join`, {
        data: {
          accepted: false,
          error: true,
        },
        message: 'No Incorrect meeting details',
      });

      return {
        ...data,
        socketId: client.id,
      };
    }

    // client will join room
    client.join(`${meeting.id}:room`);
    (client as any).metadata = { ...data, socketId: client.id };
    const sockets = await this.server.sockets
      .in(`${meeting.id}:room`)
      .fetchSockets();

    const users = sockets.map((socket: any) => socket.metadata);

    if (data.user_id === meeting.user_id) {
      console.log(users[0]?.socketId, client.id);
      this.server.to(client.id).emit(`/meeting/${client.id}/join`, {
        data: {
          accepted: true,
          users,
        },
        message: 'Success',
      });

      return {
        ...data,
        socketId: client.id,
      };
    }

    this.server.to(client.id).emit(`/meeting/${meeting.id}/join`, {
      data: {
        accepted: true,
        users,
      },
      message: 'Success',
    });

    return {
      ...data,
      socketId: client.id,
    };
  }

  @SubscribeMessage('/meeting/toggleDevice')
  async handleToggleMic(
    @MessageBody('')
    data: {
      meeting_token: string;
      audio: boolean;
      video: boolean;
      meeting_id: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    // emit to all the socket in the meeting room about the toggle action
    client
      .to(`${data.meeting_id}:room`)
      .emit('/meeting/toggleDevice/response', {
        socket_id: client.id,
        audio: data.audio,
        video: data.video,
      });
  }
}
