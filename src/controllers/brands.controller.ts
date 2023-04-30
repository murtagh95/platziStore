import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";

@Controller('brands')
export class BrandsController {

  @Get()
  get(
    @Query("limit") limit = 100,
    @Query("offset") offset = 10,
  ) {
    return `Brands with limit: ${limit} and offset: ${offset}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: "Brand create",
      payload
    };
  }

  @Put(':id')
  update(@Param("id") id: number, @Body() payload: any) {
    return {
      message: "Brand update",
      id: id,
      payload
    };
  }

  @Delete(':id')
  delete(@Param("id") id: number) {
    return {
      message: "Brand deleted",
      id: id
    };
  }
}
