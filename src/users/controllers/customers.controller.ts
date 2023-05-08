import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  get(
    @Query('limit') limit = 100,
    @Query('offset') offset = 10
  ) {
    return this.customersService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCustomerDto) {
    return this.customersService.update(payload, id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.delete(id);
  }
}