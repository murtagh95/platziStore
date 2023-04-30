import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";

@Controller('customers')
export class CustomersController {

  @Get()
  get(
    @Query("limit") limit = 100,
    @Query("offset") offset = 10
  ) {
    return `Customers with limit: ${limit} and offset: ${offset}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: "Customer create",
      payload
    };
  }

  @Put(':id')
  update(@Param("id") id: number, @Body() payload: any) {
    return {
      message: "Customer update",
      id: id,
      payload
    };
  }

  @Delete(':id')
  delete(@Param("id") id: number) {
    return {
      message: "Customer deleted",
      id: id
    };
  }
}
