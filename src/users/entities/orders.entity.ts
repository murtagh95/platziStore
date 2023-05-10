import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Customer } from './customers.entity';
import { Product } from '../../products/entities/products.entity';

@Schema()
export class Order extends Document {
  @Prop()
  total_price: number;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name })
  customer: Customer | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
