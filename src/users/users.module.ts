import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import {
  Customer,
  CustomerSchema,
  Skill,
  SkillSchema,
} from './entities/customers.entity';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Order, OrderSchema } from './entities/orders.entity';

import { ProductsModule } from '../products/products.module';
import { User, UserSchema } from './entities/users.entity';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Skill.name,
        schema: SkillSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [CustomersService, UsersService, OrdersService],
  exports: [UsersService],
})
export class UsersModule {}
