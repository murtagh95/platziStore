import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {
  }

  @Get()
  get(
    @Query('limit') limit = 100,
    @Query('offset') offset = 10
  ) {
    return this.ordersService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateOrderDto) {
    return this.ordersService.update(payload, id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.delete(id);
  }
}
