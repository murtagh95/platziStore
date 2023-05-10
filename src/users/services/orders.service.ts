import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/orders.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    return await this.orderModel.find().populate('customer').exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('customer')
      .exec();
    if (!order) {
      throw new NotFoundException(`Order with id #${id} not found`);
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
}
