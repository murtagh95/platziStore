import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brands.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Nike',
      description: 'Shoes brand',
      country: 'Argentina'
    }
  ];


  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const product = this.brands.find((item) => item.id == id);
    if (!product){
      throw new NotFoundException(`Brand with id #${id} not found`);
    }
    return product;
  }

  create(payload: CreateBrandDto) {
    this.counterId++;
    const newBrand = {
      id: this.counterId,
      ...payload
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(payload: UpdateBrandDto, id: number) {
    const indexBrand = this.brands.findIndex((item) => item.id == id);
    if (indexBrand != -1) {
      this.brands[indexBrand] = {
        ...this.brands[indexBrand],
        ...payload
      };
      return this.brands[indexBrand]
    }
    throw new NotFoundException(`Brand with id #${id} not found`);
  }

  delete(id: number) {
    const indexBrand = this.brands.findIndex((item) => item.id == id);
    console.error(indexBrand)
    if (indexBrand != -1) {
      this.brands.splice(indexBrand, 1);
      return null
    }
    throw new NotFoundException(`Brand with id #${id} not found`);
  }

}
