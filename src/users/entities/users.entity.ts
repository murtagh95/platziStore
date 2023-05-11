import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  country: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
