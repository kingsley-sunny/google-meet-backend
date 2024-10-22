/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/swagger': {
      models: [
        [import('./database/base/base.model'), { BaseModel: {} }],
        [
          import('./database/models/meeting/meeting.model'),
          {
            MeetingModel: {
              id: { required: true, type: () => Number },
              uuid: { required: true, type: () => String },
              created_at: { required: true, type: () => String },
              updated_at: { required: true, type: () => String },
              name: { required: true, type: () => String },
              link: { required: true, type: () => String },
              user_id: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./database/models/user/user.model'),
          {
            UserModel: {
              id: { required: true, type: () => Number },
              uuid: { required: true, type: () => String },
              created_at: { required: true, type: () => String },
              updated_at: { required: true, type: () => String },
              name: { required: true, type: () => String },
              email: { required: true, type: () => String },
              registration_provider: { required: true, type: () => String },
              pic_url: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./modules/user/dto/create-user.dto'),
          {
            CreateUserDto: {
              name: { required: true, type: () => String },
              email: { required: true, type: () => String },
              password: { required: true, type: () => String, minLength: 1 },
              pic_url: { required: true, type: () => String },
              registration_provider: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./modules/auth/login/dto/login.dto'),
          {
            LoginDto: {
              email: { required: true, type: () => String },
              password: {
                required: true,
                type: () => String,
                minLength: 5,
                maxLength: 20,
              },
            },
          },
        ],
        [
          import('./modules/meeting/dto/create-meeting.dto'),
          {
            CreateMeetingDto: { name: { required: true, type: () => String } },
          },
        ],
        [
          import('./database/models/meetingUser/meetingUser.model'),
          {
            MeetingUserModel: {
              id: { required: true, type: () => Number },
              uuid: { required: true, type: () => String },
              created_at: { required: true, type: () => String },
              updated_at: { required: true, type: () => String },
              meeting_id: { required: true, type: () => Number },
              user_id: { required: true, type: () => Number },
              name: { required: true, type: () => String },
              temporary_user_id: { required: true, type: () => String },
              meeting_token: { required: true, type: () => String },
              status: { required: true, type: () => Object },
            },
          },
        ],
        [
          import('./database/models/chat/chat.model'),
          {
            ChatModel: {
              id: { required: true, type: () => Number },
              uuid: { required: true, type: () => String },
              created_at: { required: true, type: () => String },
              updated_at: { required: true, type: () => String },
              meeting_id: { required: true, type: () => Number },
              user_id: { required: true, type: () => Number },
              temporary_user_id: { required: true, type: () => String },
              message: { required: true, type: () => String },
              user_name: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./database/models/meetingInvite/meetingInvite.model'),
          {
            MeetingInviteModel: {
              id: { required: true, type: () => Number },
              uuid: { required: true, type: () => String },
              created_at: { required: true, type: () => String },
              updated_at: { required: true, type: () => String },
              meeting_id: { required: true, type: () => Number },
              status: { required: true, type: () => Object },
              user_id: { required: true, type: () => Number },
              name: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./modules/meetingInvite/dto/create-meetingInvite.dto'),
          {
            CreateMeetingInviteDto: {
              meeting_id: { required: true, type: () => Number },
              name: { required: true, type: () => String },
              user_id: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./modules/meetingInvite/dto/update-meetingInvite.dto'),
          {
            UpdateMeetingInviteDto: {
              status: { required: true, type: () => Object },
            },
          },
        ],
        [
          import('./modules/meetingInvite copy/dto/create-meetingInvite.dto'),
          {
            CreateMeetingInviteDto: {
              meeting_id: { required: true, type: () => Number },
              name: { required: true, type: () => String },
              user_id: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./modules/meetingInvite copy/dto/update-meetingInvite.dto'),
          {
            UpdateMeetingInviteDto: {
              status: { required: true, type: () => Object },
            },
          },
        ],
        [
          import('./modules/meetingUser/dto/create-meetingUser.dto'),
          {
            CreateMeetingInviteDto: {
              meeting_id: { required: true, type: () => Number },
              name: { required: true, type: () => String },
              user_id: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./modules/meetingUser/dto/update-meetingUser.dto'),
          {
            UpdateMeetingInviteDto: {
              status: { required: true, type: () => Object },
            },
          },
        ],
      ],
      controllers: [
        [
          import('./app.controller'),
          { AppController: { getHello: { type: String } } },
        ],
        [
          import('./modules/user/user.controller'),
          {
            UserController: {
              create: { type: Object },
              find: { type: Object },
              findById: { type: Object },
            },
          },
        ],
        [
          import('./modules/auth/login/login.controller'),
          { LoginController: { create: { type: Object } } },
        ],
        [
          import('./modules/auth/signup/signup.controller'),
          { SignUpController: { create: { type: Object } } },
        ],
        [
          import('./modules/meeting/meeting.controller'),
          {
            MeetingController: {
              create: { type: Object },
              find: { type: Object },
              findByLink: { type: Object },
            },
          },
        ],
        [
          import('./modules/meetingInvite/meetingInvite.controller'),
          {
            MeetingInviteController: {
              create: { type: Object },
              updateInvite: { type: Object },
              find: { type: Object },
            },
          },
        ],
        [
          import('./modules/meetingInvite copy/meetingInvite.controller'),
          {
            MeetingInviteController: {
              create: { type: Object },
              updateInvite: { type: Object },
              find: { type: Object },
            },
          },
        ],
        [
          import('./modules/meetingUser/meetingUser.controller'),
          {
            MeetingInviteController: {
              create: { type: Object },
              updateInvite: { type: Object },
              find: { type: Object },
            },
          },
        ],
      ],
    },
  };
};
