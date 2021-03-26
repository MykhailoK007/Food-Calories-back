import { Role } from './../../entities/user.entity';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class UserDto {
  @IsString()
  id: string;

  role: Role;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsUrl()
  picture?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
}
