import { IsEmail, IsOptional, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(5, 20)
  password: string;
}
