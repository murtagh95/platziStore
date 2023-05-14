import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import {
  AddProductsToOrderDto,
  CreateOrderDto,
  UpdateOrderDto,
} from '../dtos/orders.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  get(@Query('limit') limit = 100, @Query('offset') offset = 10) {
    console.log(`limit => ${limit}`);
    console.log(`offset => ${offset}`);
    return this.ordersService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.update(payload, id);
  }

  @Put(':id/products')
  updateProducts(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: AddProductsToOrderDto,
  ) {
    return this.ordersService.addProduct(id, payload.productsIds);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.delete(id);
  }

  @Delete(':id/product/:productId')
  deleteProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.ordersService.deleteProduct(id, productId);
  }
}
