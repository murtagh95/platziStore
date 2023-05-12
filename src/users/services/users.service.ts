import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return await this.userModel.find().select('-password').exec();
  }

  findOne(id: string) {
    const user = this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    try {
      const newUser = new this.userModel(payload);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      const user = await newUser.save();
      return this.userModel
        .findById(user.toJSON()._id)
        .select('-password')
        .exec();
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException('The email has to be unique.');
      }
      throw e;
    }
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  update(payload: UpdateUserDto, id: string) {
    const user = this.userModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }

  delete(id: string) {
    const user = this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }
}
