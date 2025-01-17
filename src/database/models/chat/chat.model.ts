import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { UserModel } from '../user/user.model';
import { IChat } from './chat.interface';
import { ChatValidation } from './chat.validation';

export class ChatModel extends BaseModel implements IChat {
  public id: IChat['id'];
  public created_at: IChat['created_at'];
  public updated_at: IChat['updated_at'];

  public meeting_id: IChat['meeting_id'];
  public user_id: IChat['user_id'];
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
    };
  }
}
