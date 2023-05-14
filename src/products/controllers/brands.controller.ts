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
import { BrandsService } from '../services/brands.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get()
  get(@Query('limit') limit = 100, @Query('offset') offset = 10) {
    console.log(`limit => ${limit}`);
    console.log(`offset => ${offset}`);
    return this.brandService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.brandService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.update(payload, id);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.brandService.delete(id);
  }
}
