import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  async findAll(query: any) {
    const { categoryId, minPrice, maxPrice, page = 1, limit = 10 } = query;
    const where: any = {};

    if (categoryId) where.categoryId = Number(categoryId);
    if (minPrice && maxPrice) where.price = Between(minPrice, maxPrice);

    const [items, total] = await this.productRepo.findAndCount({
      where,
      relations: ['category'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return { total, page: Number(page), limit: Number(limit), items };
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }

  async search(keyword: string) {
    return this.productRepo
      .createQueryBuilder('product')
      .where('product.name ILIKE :q OR product.description ILIKE :q', {
        q: `%${keyword}%`,
      })
      .leftJoinAndSelect('product.category', 'category')
      .getMany();
  }
}
