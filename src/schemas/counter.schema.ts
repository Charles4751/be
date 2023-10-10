import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CounterDocument = HydratedDocument<Counter>;

@Schema()
export class Counter {
  @Prop()
  modelName: string;

  @Prop()
  nextId: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
