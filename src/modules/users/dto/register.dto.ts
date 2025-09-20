// users/register.dto.ts

import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { Role } from 'src/modules/common/enums/role.enum';

export class RegisterDto {
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  @ValidateIf((o) => o.email !== '') // Validate only if the email is provided
  email?: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
    message: ' Password must contain at least one letter and one number',
  })
  password: string;

  @IsString()
  confirmPassword: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
