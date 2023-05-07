import { Injectable, NotFoundException } from "@nestjs/common";
import { Order } from "../entities/orders.entity";
import { CreateOrderDto, UpdateOrderDto } from "../dtos/orders.dto";
import { ProductsService } from "../../products/services/products.service";
import { UsersService } from "./users.service";

@Injectable()
export class OrdersService {
  constructor(private productService: ProductsService, private userService: UsersService) {}

  private counterId = 1;
  private orders: Order[] = [
    {
      id: 1,
      name: "Order 1",
      description: "Order....",
      product_ids: [this.productService.findOne(1)],
      total_price: 123,
      date: new Date(),
      user: this.userService.findOne(1)
    }
  ];


  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    const order = this.orders.find((item) => item.id == id);
    if (!order){
      throw new NotFoundException(`Order with id #${id} not found`);
    }
    return order;
  }

  create(payload: CreateOrderDto) {
    this.counterId++;
    const total_price = this.productService.findAll().reduce((accum: number, item) => {
      return accum + item.price;
    }, 0)
    const newOrder = {
      id: this.counterId,
      total_price,
      ...payload
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  update(payload: UpdateOrderDto, id: number) {
    const indexOrder = this.orders.findIndex((item) => item.id == id);
    if (indexOrder != -1) {
      this.orders[indexOrder] = {
        ...this.orders[indexOrder],
        ...payload
      };
      return this.orders[indexOrder]
    }
    throw new NotFoundException(`Order with id #${id} not found`);
  }

  delete(id: number) {
    const indexCategory = this.orders.findIndex((item) => item.id == id);
    if (indexCategory != -1) {
      this.orders.splice(indexCategory, 1);
      return null
    }
    throw new NotFoundException(`Category with id #${id} not found`);
  }

}
