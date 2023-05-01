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
  ParseIntPipe
} from "@nestjs/common";
import { ProductsService} from "../services/products.service";

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

  @Get("/filter")
  getFilter() {
    return `I'm a filter`;
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  getOne(@Param("id", ParseIntPipe) id: number) {
    // Con el + convierto el strign a numero
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param("id", ParseIntPipe) id: number, @Body() payload: any) {
    return this.productService.update(payload, id);
  }

  @Delete(':id')
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }

}
