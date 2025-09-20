import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from '../users/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.username,
      registerDto.email,
      registerDto.password,
      registerDto.confirmPassword,
      registerDto.role,
    );
  }
}
