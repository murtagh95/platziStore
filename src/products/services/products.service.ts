import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/products.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  findAll(params?: FilterProductsDto) {
    if (!!params) {
      const { limit, offset } = params;
      return this.productModel.find().skip(offset).limit(limit).exec();
    }
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = new this.productModel(payload);
    return newProduct.save();
  }

  update(payload: UpdateProductDto, id: string) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }
    return product;
  }

  delete(id: string) {
    const product = this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }
    return product;
  }
}
