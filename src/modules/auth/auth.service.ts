import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from "bcrypt"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import nodemailer from "nodemailer"
import { VerifyDto } from './dto/verify.dto';
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private nodemailer: nodemailer.Transporter
  constructor(
    @InjectRepository(Auth) private authRepo: Repository<Auth>,
    private jwtService: JwtService
  ) {
    this.nodemailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jasurjumaboyev80@gmail.com",
        pass: process.env.APP_KEY
      }
    })
  }

  async register(createAuthDto: CreateAuthDto) {
    const { username, email, password } = createAuthDto
    const foundedUser = await this.authRepo.findOne({ where: { email } })
    if (foundedUser) throw new BadRequestException("User already exsits")

    const hashPassword = await bcrypt.hash(password, 10)

    const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join("")

    const time = Date.now() + 120000

    await this.nodemailer.sendMail({
      from: "jasurjumaboyev80@gmail.com",
      to: email,
      subject: "Lesson",
      text: "test content",
      html: `<b>${otp}</b>`
    })

    const user = this.authRepo.create({ username, email, password: hashPassword, otp, otpTime: time });
    await this.authRepo.save(user)

    return { message: "Registered" }
  }

  async verify(dto: VerifyDto) {
    const { email, otp } = dto

    const foundeduser = await this.authRepo.findOne({ where: { email } })

    const otpValidation = /^\d{6}$/.test(otp)

    if (!otpValidation) throw new BadRequestException("Invalid otp")

    if (!foundeduser) throw new UnauthorizedException("Email not found")

    if (foundeduser.otp !== otp) throw new BadRequestException("Wrong otp")

    const now = Date.now()
    if (foundeduser.otpTime && foundeduser.otpTime < now) throw new BadRequestException("Otp expired")

    await this.authRepo.update(foundeduser.id, { otp: "", otpTime: 0 })

    const payload = { username: foundeduser.username, role: foundeduser.role };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto
    const foundedUser = await this.authRepo.findOne({ where: { email } })
    if (!foundedUser) throw new BadRequestException("User not found")

    const checkPassword = await bcrypt.compare(password, foundedUser.password)

    if (checkPassword) {
      const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("")

      const time = Date.now() + 120000

      await this.nodemailer.sendMail({
        from: "jasurjumaboyev80@gmail.com",
        to: email,
        subject: "Lesson",
        text: "test content",
        html: `<b>${otp}</b>`
      })

      await this.authRepo.update(foundedUser.id, { otp, otpTime: time })

      return { message: "Please chek your email" };
    } else {
      throw new BadRequestException("Wrong password")
    }
  }
}
