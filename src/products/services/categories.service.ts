import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'Category....',
    }
  ];


  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id == id);
    if (!category){
      throw new NotFoundException(`Category with id #${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    this.counterId++;
    const newCategory = {
      id: this.counterId,
      ...payload
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(payload: UpdateCategoryDto, id: number) {
    const indexCategory = this.categories.findIndex((item) => item.id == id);
    if (indexCategory != -1) {
      this.categories[indexCategory] = {
        ...this.categories[indexCategory],
        ...payload
      };
      return this.categories[indexCategory]
    }
    throw new NotFoundException(`Category with id #${id} not found`);
  }

  delete(id: number) {
    const indexCategory = this.categories.findIndex((item) => item.id == id);
    if (indexCategory != -1) {
      this.categories.splice(indexCategory, 1);
      return null
    }
    throw new NotFoundException(`Category with id #${id} not found`);
  }

}
