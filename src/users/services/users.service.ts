import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { Order } from '../entities/orders.entity';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    private configService: ConfigService,
  ) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'User 1',
      country: 'USA',
    },
  ];

  findAll() {
    console.log(this.configService.get('API_KEY'));
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id == id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId++;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(payload: UpdateUserDto, id: number) {
    const indexUser = this.users.findIndex((item) => item.id == id);
    if (indexUser != -1) {
      this.users[indexUser] = {
        ...this.users[indexUser],
        ...payload,
      };
      return this.users[indexUser];
    }
    throw new NotFoundException(`User with id #${id} not found`);
  }

  delete(id: number) {
    const indexUser = this.users.findIndex((item) => item.id == id);
    if (indexUser != -1) {
      this.users.splice(indexUser, 1);
      return null;
    }
    throw new NotFoundException(`User with id #${id} not found`);
  }

  async getOrderByUser(user: User) {
    return {
      id: 2,
      name: 'BLA',
      description: 'bla bla',
      date: new Date(),
      total_price: 123,
      product_ids: await this.productService.findAll(),
      user,
    };
  }
}
