import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customers.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Pepe Grillo',
      country: 'Argentina',
      phone: 123,
      dni: '1234123412',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id == id);
    if (!customer) {
      throw new NotFoundException(`Customer with id #${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId++;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(payload: UpdateCustomerDto, id: number) {
    const indexCustomer = this.customers.findIndex((item) => item.id == id);
    if (indexCustomer != -1) {
      this.customers[indexCustomer] = {
        ...this.customers[indexCustomer],
        ...payload,
      };
      return this.customers[indexCustomer];
    }
    throw new NotFoundException(`Customer with id #${id} not found`);
  }

  delete(id: number) {
    const indexCustomer = this.customers.findIndex((item) => item.id == id);
    console.error(indexCustomer);
    if (indexCustomer != -1) {
      this.customers.splice(indexCustomer, 1);
      return null;
    }
    throw new NotFoundException(`Customer with id #${id} not found`);
  }
}
