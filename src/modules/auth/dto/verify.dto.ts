import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({default: "jasurjumaboyev80@gmail.com"})
    email!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({default: "123456"})
    otp!: string;
}