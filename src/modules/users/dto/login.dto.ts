import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address (optional)',
    required: false,
  })
  @IsEmail()
  @ValidateIf((o) => o.email !== '')
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
}
