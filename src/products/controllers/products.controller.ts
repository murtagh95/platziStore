import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from "../dtos/products.dto";
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  get(@Query() params: FilterProductsDto) {
    return this.productService.findAll(params);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductDto) {
    return this.productService.update(payload, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific product' })
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productService.delete(id);
  }
}
