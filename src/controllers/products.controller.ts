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

@Controller('products')
export class ProductsController {

  @Get()
  get(
    @Query("limit") limit = 100,
    @Query("offset") offset = 10,
    @Query("brand") brand: string
  ) {
    return `Product with limit: ${limit} and offset: ${offset}, brand => ${brand}`;
  }

  @Get("/filter")
  getFilter() {
    return `I'm a filter`;
  }

  @Get("/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param("id") id: number) {
    console.log(typeof id);
    return `Product with id ${id}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: "Product create",
      payload
    };
  }

  @Put(':id')
  update(@Param("id") id: number, @Body() payload: any) {
    return {
      message: "Product update",
      id: id,
      payload
    };
  }

  @Delete(':id')
  delete(@Param("id") id: number) {
    return {
      message: "Product deleted",
      id: id
    };
  }

}
