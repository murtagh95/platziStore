import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return await this.userModel.find().exec();
  }

  findOne(id: string) {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    try {
      const newUser = new this.userModel(payload);
      await newUser.save();
      return newUser;
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException('The email has to be unique.');
      }
      throw e;
    }
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
