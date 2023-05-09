import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Brand extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  country: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
