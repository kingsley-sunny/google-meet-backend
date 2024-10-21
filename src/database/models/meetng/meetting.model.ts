import { ApiHideProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { UserModel } from '../user/user.model';
import { IMeeting } from './meetting.interface';
import { MeetingValidation } from './meetting.validation';

export class MeetingModel extends BaseModel implements IMeeting {
  public id: IMeeting['id'];
  public uuid: IMeeting['uuid'];
  public created_at: IMeeting['created_at'];
  public updated_at: IMeeting['updated_at'];

  public name: IMeeting['name'];
  public link: IMeeting['link'];

  @ApiHideProperty()
  public user_id: IMeeting['user_id'];

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
