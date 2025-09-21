import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.productsService.findAll(query);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.productsService.search(q);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}
