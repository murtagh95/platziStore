import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/products.entity';
import { Brand, BrandSchema } from './entities/brands.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
