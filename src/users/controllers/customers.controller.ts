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
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  get(@Query('limit') limit = 100, @Query('offset') offset = 10) {
    console.log(`limit => ${limit}`);
    console.log(`offset => ${offset}`);
    return this.customersService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateCustomerDto) {
    return await this.customersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(payload, id);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.customersService.delete(id);
  }
}
