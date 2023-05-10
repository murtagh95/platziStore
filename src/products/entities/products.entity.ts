import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Brand } from './brands.entity';
import { Category } from './categories.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number, index: true })
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop({ type: URL })
  image: string;

  // Relaciones embebidas sin tipear
  // @Prop(
  //   raw({
  //     name: { type: String },
  //     description: { type: String },
  //   }),
  // )
  // category: Record<string, any>;

  @Prop({ type: Category })
  category: Category;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 }); // Indexes on a composite basis
