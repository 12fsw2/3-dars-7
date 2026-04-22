import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    otp!: string;
}