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
  HttpStatus
} from "@nestjs/common";
import { ProductsService } from "../services/products.service";
import { ParseIntPipe } from "../common/parse-int/parse-int.pipe";
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dto";

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {
  }

  @Get()
  get(
    @Query("limit") limit = 100,
    @Query("offset") offset = 10,
    @Query("brand") brand: string
  ) {
    return this.productService.findAll();
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  getOne(@Param("id", ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param("id", ParseIntPipe) id: number, @Body() payload: UpdateProductDto) {
    return this.productService.update(payload, id);
  }

  @Delete(':id')
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }

}
