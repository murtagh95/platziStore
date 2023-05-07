import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos/categories.dto";
import { ParseIntPipe } from "../../common/parse-int/parse-int.pipe";
import { CategoriesService } from "../services/categories.service";

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {
  }

  @Get()
  get(
    @Query("limit") limit = 100,
    @Query("offset") offset = 10
  ) {
    return this.categoriesService.findAll();
  }

  @Get("/:id")
  getOne(@Param("id", ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(@Param("id", ParseIntPipe) id: number, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(payload, id);
  }

  @Delete(':id')
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }
}
