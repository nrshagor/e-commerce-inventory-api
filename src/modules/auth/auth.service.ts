import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    username: string,
    email: string | undefined,
    password: string,
    confirmPassword: string,
    role: string,
  ) {
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    try {
      const newUser = await this.usersService.createUser(
        username,
        email,
        password,
        role,
      );

      return newUser;
    } catch (error) {
      if (/(email)[\s\S]+(already exists)/.test(error.detail)) {
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      } else if (/(phone)[\s\S]+(already exists)/.test(error.detail)) {
        throw new BadRequestException(
          'Account with this Phone number already exists.',
        );
      }
    }
  }
}
