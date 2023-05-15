import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/orders.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    return await this.orderModel
      .find()
      .populate('customer')
      .populate({
        path: 'products',
        populate: {
          path: 'brand',
        },
      })
      .exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('customer')
      .populate({
        path: 'products',
        populate: {
          path: 'brand',
        },
      })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order with id #${id} not found`);
    }
    return order;
  }

  async findOneByCustomer(customerId: string) {
    const order = await this.orderModel
      .find({
        where: {
          customer: customerId,
        },
      })
      .populate('customer')
      .populate({
        path: 'products',
        populate: {
          path: 'brand',
        },
      })
      .exec();
    if (!order) {
      throw new NotFoundException(
        `Order with customer id #${customerId} not found`,
      );
    }
    return order;
  }

  async create(payload: CreateOrderDto) {
    const newOrder = new this.orderModel(payload);
    await newOrder.save();
    return newOrder;
  }

  update(payload: UpdateOrderDto, id: string) {
    const order = this.orderModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
    if (!order) {
      throw new NotFoundException(`Order with id #${id} not found`);
    }
    return order;
  }

  delete(id: string) {
    const order = this.orderModel.findByIdAndDelete(id);
    if (!order) {
      throw new NotFoundException(`Order with id #${id} not found`);
    }
    return order;
  }

  async deleteProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id).exec();
    order.products.pull(productId);
    await order.save();
    return order;
  }

  async addProduct(id: string, productsIds: string[]) {
    const order = await this.orderModel.findById(id).exec();
    productsIds.forEach((productId) => {
      order.products.push(productId);
    });
    await order.save();
    return order;
  }
}
