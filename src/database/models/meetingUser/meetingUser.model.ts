import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { UserModel } from '../user/user.model';
import { IMeetingUser } from './meetingUser.interface';
import { MeetingUserValidation } from './meetingUser.validation';

export class MeetingUserModel extends BaseModel implements IMeetingUser {
  public id: IMeetingUser['id'];
  public uuid: IMeetingUser['uuid'];
  public created_at: IMeetingUser['created_at'];
  public updated_at: IMeetingUser['updated_at'];

  public meeting_id: IMeetingUser['meeting_id'];
  public user_id: IMeetingUser['user_id'];
  public name: IMeetingUser['name'];
  public temporary_user_id: IMeetingUser['temporary_user_id'];

  static get tableName() {
    return DATABASE_TABLES.users;
  }

  static get jsonSchema() {
    return MeetingUserValidation;
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DATABASE_TABLES.users}.id`,
          to: `${DATABASE_TABLES.meeting_users}.user_id`,
        },
      },
    };
  }
}
