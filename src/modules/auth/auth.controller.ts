import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyDto } from './dto/verify.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiInternalServerErrorResponse({ description: "Internal server error" })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ description: "ro'yxatdan otish uchun" })
  @ApiBadRequestResponse({ description: "User already exsits" })
  @ApiCreatedResponse({ description: "Registered" })
  @HttpCode(201)
  @Post("register")
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @ApiBadRequestResponse({ description: "Invalid otp" })
  @ApiBadRequestResponse({ description: "Wrong otp" })
  @ApiBadRequestResponse({ description: "expired" })
  @ApiUnauthorizedResponse({ description: "Email not found" })
  @HttpCode(200)
  @Post("verify")
  verify(@Body() dot: VerifyDto) {
    return this.authService.verify(dot);
  }

  @ApiBadRequestResponse({ description: "User not found" })
  @ApiBadRequestResponse({ description: "Wrong password" })
  @ApiOkResponse({description: "Please chek your email"})
  @Post("login")
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }
}
