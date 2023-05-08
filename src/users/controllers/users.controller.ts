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
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  get(@Query('limit') limit = 100, @Query('offset') offset = 10) {
    console.log(`limit => ${limit}`);
    console.log(`offset => ${offset}`);
    return this.usersService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get('/:id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.findOne(id);
    return this.usersService.getOrderByUser(user);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(payload, id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
