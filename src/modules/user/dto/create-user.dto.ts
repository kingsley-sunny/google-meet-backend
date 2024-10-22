import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @ValidateIf((o) => {
    return o.registration_provider !== 'google';
  })
  @Length(1)
  password: string;

  @IsString()
  @IsOptional()
  pic_url: string;

  @IsString()
  @IsOptional()
  registration_provider: 'google';
}
