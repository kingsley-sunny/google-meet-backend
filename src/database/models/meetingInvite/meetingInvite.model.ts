import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { UserModel } from '../user/user.model';
import { IMeetingInvite } from './meetingInvite.interface';
import { MeetingInviteValidation } from './meetingInvite.validation';

export class MeetingInviteModel extends BaseModel implements IMeetingInvite {
  public id: IMeetingInvite['id'];
  public uuid: IMeetingInvite['uuid'];
  public created_at: IMeetingInvite['created_at'];
  public updated_at: IMeetingInvite['updated_at'];

  public meeting_id: IMeetingInvite['meeting_id'];
  public status: IMeetingInvite['status'];
  public user_id: IMeetingInvite['user_id'];
  public name: IMeetingInvite['name'];

  static get tableName() {
    return DATABASE_TABLES.meeting_invites;
  }

  static get jsonSchema() {
    return MeetingInviteValidation;
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
