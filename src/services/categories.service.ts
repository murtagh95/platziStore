import { Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "../entities/categories.entity";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos/categories.dto";

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: "Category 1",
      description: "Category....",
    }
  ];


  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const product = this.categories.find((item) => item.id == id);
    if (!product){
      throw new NotFoundException(`Category with id #${id} not found`);
    }
    return product;
  }

  create(payload: CreateCategoryDto) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload
    };
    this.categories.push(newProduct);
    return newProduct;
  }

  update(payload: UpdateCategoryDto, id: number) {
    const indexProduct = this.categories.findIndex((item) => item.id == id);
    if (indexProduct != -1) {
      this.categories[indexProduct] = {
        ...this.categories[indexProduct],
        ...payload
      };
      return this.categories[indexProduct]
    }
    throw new NotFoundException(`Category with id #${id} not found`);
  }

  delete(id: number) {
    const indexProduct = this.categories.findIndex((item) => item.id == id);
    if (indexProduct != -1) {
      this.categories.splice(indexProduct, 1);
    }
    throw new NotFoundException(`Category with id #${id} not found`);
  }

}
