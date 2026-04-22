import { from } from "rxjs";
import { IsEmail, IsNotEmpty, isString, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateAuthDto {
  @IsString()
  @MinLength(3, {message: "Kamida 3 ta harf bolsin"})
  @MaxLength(50)
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
  password!: string;
}
