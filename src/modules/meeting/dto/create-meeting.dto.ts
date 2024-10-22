import { IsOptional, IsString } from 'class-validator';

export class CreateMeetingDto {
  @IsString()
  @IsOptional()
  name: string;
}
