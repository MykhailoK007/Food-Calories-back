import { IsEmail, IsPhoneNumber, IsString, IsUrl } from "class-validator";

export class CreateDto {

    @IsString()
    username: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsUrl()
    picture: string;

    @IsString()
    description: string;

    @IsPhoneNumber()
    phoneNumber: string;
}