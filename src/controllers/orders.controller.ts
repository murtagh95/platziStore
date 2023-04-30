import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";

@Controller('orders')
export class OrdersController {

  @Get()
  get(
    @Query("limit") limit = 100,
    @Query("offset") offset = 10
  ) {
    return `Orders with limit: ${limit} and offset: ${offset}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: "Order create",
      payload
    };
  }

  @Put(':id')
  update(@Param("id") id: number, @Body() payload: any) {
    return {
      message: "Order update",
      id: id,
      payload
    };
  }

  @Delete(':id')
  delete(@Param("id") id: number) {
    return {
      message: "Order deleted",
      id: id
    };
  }
}
