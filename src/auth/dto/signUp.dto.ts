import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsUrl()
    picture: string;

    @IsString()
    description: string;

    @IsPhoneNumber()
    phoneNumber: string;
    
    createdAt: Date;

}