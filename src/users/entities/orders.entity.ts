import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from './customers.entity';

@Schema()
export class Order extends Document {
  @Prop()
  total_price: number;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name })
  customer: Customer | Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
