import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [CustomersService, UsersService, OrdersService],
})
export class UsersModule {}
