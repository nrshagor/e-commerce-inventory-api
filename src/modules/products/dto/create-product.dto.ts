import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'iPhone 17 Pro',
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Latest Apple smartphone with A17 Pro chip',
    description: 'A short description of the product',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 1299.99,
    description: 'Price of the product in USD',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 50,
    description: 'Number of units available in stock',
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    example: 1,
    description: 'The category ID this product belongs to',
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    example: 'https://example.com/images/iphone15pro.jpg',
    description: 'Optional image URL of the product',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
