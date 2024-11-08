import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { MeetingModel } from '../meeting/meeting.model';
import { UserModel } from '../user/user.model';
import { IMeetingUser } from './meetingUser.interface';
import { MeetingUserValidation } from './meetingUser.validation';

export class MeetingUserModel extends BaseModel implements IMeetingUser {
  public id: IMeetingUser['id'];
  public created_at: IMeetingUser['created_at'];
  public updated_at: IMeetingUser['updated_at'];
  public meeting_id: IMeetingUser['meeting_id'];
  public name: IMeetingUser['name'];
  public status: IMeetingUser['status'];
  public user_id: IMeetingUser['user_id'];

  static get tableName() {
    return DATABASE_TABLES.meeting_users;
  }

  static get jsonSchema() {
    return MeetingUserValidation;
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      meeting: {
        relation: Model.BelongsToOneRelation,
        modelClass: MeetingModel,
        join: {
          from: `${DATABASE_TABLES.meetings}.id`,
          to: `${DATABASE_TABLES.meeting_users}.meeting_id`,
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DATABASE_TABLES.users}.id`,
          to: `${DATABASE_TABLES.meeting_users}.userId`,
        },
      },
    };
  }
}
