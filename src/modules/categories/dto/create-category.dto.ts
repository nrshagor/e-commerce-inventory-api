import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'The unique name of the category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Devices like phones, laptops, and gadgets',
    description: 'A short description of the category',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
