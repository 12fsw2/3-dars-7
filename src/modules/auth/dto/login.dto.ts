import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({default: "jasurjumaboyev80@gmail.com"})
  email!: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
  @ApiProperty({default: "Abror4321!sad"})
  password!: string;
}
