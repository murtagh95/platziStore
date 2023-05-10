import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Customer } from '../entities/customers.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  findOne(id: string) {
    const customer = this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException(`Customer with id #${id} not found`);
    }
    return customer;
  }

  async create(payload: CreateCustomerDto) {
    try {
      const newCustomer = new this.customerModel(payload);
      await newCustomer.save();
      return newCustomer;
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException(
          'The phone must be unique to the customer.',
        );
      }
      throw e;
    }
  }

  update(payload: UpdateCustomerDto, id: string) {
    const customer = this.customerModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
    if (!customer) {
      throw new NotFoundException(`Customer with id #${id} not found`);
    }
    return customer;
  }

  delete(id: string) {
    const customer = this.customerModel.findByIdAndDelete(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id #${id} not found`);
    }
    return customer;
  }
}
