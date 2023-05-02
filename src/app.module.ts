import { Module } from "@nestjs/common";
import { ProductsController } from "./controllers/products.controller";
import { CategoriesController } from "./controllers/categories.controller";
import { BrandsController } from "./controllers/brands.controller";
import { UsersController } from "./controllers/users.controller";
import { OrdersController } from "./controllers/orders.controller";
import { CustomersController } from "./controllers/customers.controller";
import { ProductsService } from "./services/products.service";
import { CategoriesService } from "./services/categories.service";
import { BrandsService } from "./services/brands.service";
import { CustomersService } from "./services/customers.service";
import { OrdersService } from './services/orders.service';

@Module({
  imports: [],
  controllers: [ProductsController, CategoriesController, BrandsController, UsersController, OrdersController, CustomersController],
  providers: [ProductsService, CategoriesService, BrandsService, CustomersService, OrdersService]
})
export class AppModule {
}
