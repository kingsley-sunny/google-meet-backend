import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { MeetingUserModel } from '../meetingUser/meetingUser.model';
import { UserModel } from '../user/user.model';
import { IChat } from './chat.interface';
import { ChatValidation } from './chat.validation';

export class ChatModel extends BaseModel implements IChat {
  public id: IChat['id'];
  public uuid: IChat['uuid'];
  public created_at: IChat['created_at'];
  public updated_at: IChat['updated_at'];

  public meeting_id: IChat['meeting_id'];
  public user_id: IChat['user_id'];
  public temporary_user_id: IChat['temporary_user_id'];
  public message: IChat['message'];
  public user_name: IChat['user_name'];

  static get tableName() {
    return DATABASE_TABLES.chats;
  }

  static get jsonSchema() {
    return ChatValidation;
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DATABASE_TABLES.users}.id`,
          to: `${DATABASE_TABLES.meetings}.user_id`,
        },
      },
      temporary_user: {
        relation: Model.BelongsToOneRelation,
        modelClass: MeetingUserModel,
        join: {
          from: `${DATABASE_TABLES.meeting_users}.temporary_user_id`,
          to: `${DATABASE_TABLES.chats}.temporary_user_id`,
        },
      },
    };
  }
}
