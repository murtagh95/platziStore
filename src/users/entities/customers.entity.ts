import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop()
  name: string;

  @Prop()
  last_name: string;

  @Prop()
  country: string;

  @Prop()
  dni: string;

  @Prop({ unique: true })
  phone: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
