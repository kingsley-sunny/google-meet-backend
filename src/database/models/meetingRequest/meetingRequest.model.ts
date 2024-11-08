import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { UserModel } from '../user/user.model';
import { IMeetingRequest } from './meetingRequest.interface';
import { MeetingRequestValidation } from './meetingRequest.validation';

export class MeetingRequestModel extends BaseModel implements IMeetingRequest {
  public id: IMeetingRequest['id'];
  public created_at: IMeetingRequest['created_at'];
  public updated_at: IMeetingRequest['updated_at'];

  public meeting_id: IMeetingRequest['meeting_id'];
  public status: IMeetingRequest['status'];
  public user_id: IMeetingRequest['user_id'];
  public name: IMeetingRequest['name'];

  static get tableName() {
    return DATABASE_TABLES.meeting_requests;
  }

  static get jsonSchema() {
    return MeetingRequestValidation;
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
    };
  }
}
