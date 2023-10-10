// create-user.dto.ts

import { IsString, IsEmail, IsMobilePhone, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nickName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phoneNumber: number;

  @IsString()
  @MinLength(6)
  password: string;
}
