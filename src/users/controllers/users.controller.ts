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
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async get(@Query('limit') limit = 100, @Query('offset') offset = 10) {
    console.log(`limit => ${limit}`);
    console.log(`offset => ${offset}`);
    return await this.usersService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(payload, id);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.delete(id);
  }
}
