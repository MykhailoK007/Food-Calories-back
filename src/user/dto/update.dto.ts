import { IsEmail, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class UpdateDto {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsUrl()
  picture: string;

  @IsString()//I add description to update)
  description: string;

  @IsPhoneNumber()
  phoneNumber: string;
}
