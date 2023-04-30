import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

@Controller('categories')
export class CategoriesController {

  @Get("/:id/products/:productId")
  get(@Param("id") id: number, @Param("productId") productId: number) {
    return `Product with id ${id} and ${productId}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: "Category create",
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
