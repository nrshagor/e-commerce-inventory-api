import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
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

  async validateUser(
    email: string | undefined,
    password: string,
  ): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(
        'User not found with this email or phone number',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }
    const { passwordHash: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
