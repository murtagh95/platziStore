import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
import { UsersController } from './controllers/users.controller';
import { OrdersController } from './controllers/orders.controller';
import { CustomersController } from './controllers/customers.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController, BrandsController, UsersController, OrdersController, CustomersController],
  providers: [AppService, ProductsService, CategoriesService],
})
export class AppModule {}
