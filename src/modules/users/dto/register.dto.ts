// users/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username of the user',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address (optional)',
    required: false,
  })
  @IsEmail()
  @ValidateIf((o) => o.email !== '') // Validate only if the email is provided
  email?: string;

  @ApiProperty({
    example: 'Passw0rd123',
    description: 'Password must contain at least one letter and one number',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;

  @ApiProperty({
    example: 'Passw0rd123',
    description: 'Must match the password field',
  })
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    example: Role.USER,
    enum: Role,
    description: 'Role of the user (optional)',
    required: false,
  })
  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
