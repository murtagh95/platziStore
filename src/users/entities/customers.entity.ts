import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Skill {
  @Prop()
  name: string;

  @Prop()
  color: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);

@Schema()
export class Customer extends Document {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  country: string;

  @Prop()
  dni: string;

  @Prop({ unique: true })
  phone: string;

  // @Prop({
  //   type: [{ name: { type: String }, color: { type: String } }],
  // })
  // skills: Types.Array<Record<string, any>>;

  @Prop({ type: [SkillSchema] })
  skills: Skill[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
