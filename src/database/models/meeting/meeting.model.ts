import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { UserModel } from '../user/user.model';
import { IMeeting } from './meeting.interface';
import { MeetingValidation } from './meeting.validation';

export class MeetingModel extends BaseModel implements IMeeting {
  public id: IMeeting['id'];
  public created_at: IMeeting['created_at'];
  public updated_at: IMeeting['updated_at'];

  public name: IMeeting['name'];
  public user_id: IMeeting['user_id'];
  public token: IMeeting['token'];

  static get tableName() {
    return DATABASE_TABLES.meetings;
  }

  static get jsonSchema() {
    return MeetingValidation;
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DATABASE_TABLES.meetings}.user_id`,
          to: `${DATABASE_TABLES.users}.id`,
        },
      },
    };
  }
}
