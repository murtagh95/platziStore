import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";

@Controller('users')
export class UsersController {

  @Get()
  get(
    @Query("limit") limit = 100,
    @Query("offset") offset = 10,
  ) {
    return `Users with limit: ${limit} and offset: ${offset}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: "User create",
      payload
    };
  }

  @Put(':id')
  update(@Param("id") id: number, @Body() payload: any) {
    return {
      message: "User update",
      id: id,
      payload
    };
  }

  @Delete(':id')
  delete(@Param("id") id: number) {
    return {
      message: "User deleted",
      id: id
    };
  }
}
