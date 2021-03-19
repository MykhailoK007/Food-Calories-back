import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class CreateDto {
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
