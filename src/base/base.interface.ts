export interface IResponse {
  statusCode: number;
  message: string;
  data: any;
  timestamp: string;
  path?: string;
  resource?: string;
}

export interface ISocketMeetingUser {
  meeting_token?: string;
  name?: string;
  user_id?: string;
  peer_id: string;
  socket_id: string;
  meeting_id?: string;

  pic_url?: string;
}
