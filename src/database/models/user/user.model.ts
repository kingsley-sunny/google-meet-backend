import { ApiHideProperty } from '@nestjs/swagger';
import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { MeetingModel } from '../meetng/meetting.model';
import { IUser } from './user.interface';
import { UserValidation } from './user.validation';
import { UserPasswordOption } from './userPasswordOption';

export class UserModel extends BaseModel implements IUser {
  public id: IUser['id'];
  public uuid: IUser['uuid'];
  public created_at: IUser['created_at'];
  public updated_at: IUser['updated_at'];

  public name: IUser['name'];
  public email: IUser['email'];
  public registration_provider: IUser['registration_provider'];

  public pic_url: IUser['registration_provider'];

  @ApiHideProperty()
  public password: IUser['password'];

  static get tableName() {
    return DATABASE_TABLES.users;
  }

  static get jsonSchema() {
    return UserValidation;
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      // roles: {
      //   relation: Model.ManyToManyRelation,
      //   modelClass: RoleModel,
      //   join: {
      //     from: `${DATABASE_TABLES.users}.id`,
      //     through: {
      //       from: `${DATABASE_TABLES.user_roles}.user_id`,
      //       to: `${DATABASE_TABLES.user_roles}.role_id`,
      //     },
      //     to: `${DATABASE_TABLES.roles}.id`,
      //   },
      // },
      meetings: {
        relation: Model.HasManyRelation,
        modelClass: MeetingModel,
        join: {
          from: `${DATABASE_TABLES.users}.id`,
          to: `${DATABASE_TABLES.meetings}.user_id`,
        },
      },
    };
  }

  $formatJson(json) {
    const isPasswordHidden = UserPasswordOption.getStatus();

    if (isPasswordHidden) {
      json = super.$formatJson(json);
      delete json.password;

      UserPasswordOption.hidePassword();
    }

    return json;
  }
}
