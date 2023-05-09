import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brands.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  findAll() {
    return this.brandModel.find().exec();
  }

  findOne(id: string) {
    const brand = this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`Brand with id #${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    const newBrand = new this.brandModel(payload);
    return newBrand.save();
  }

  update(payload: UpdateBrandDto, id: string) {
    const brand = this.brandModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!brand) {
      throw new NotFoundException(`Brand with id #${id} not found`);
    }
    return brand;
  }

  delete(id: string) {
    const brand = this.brandModel.findByIdAndDelete(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id #${id} not found`);
    }
    return brand;
  }
}
