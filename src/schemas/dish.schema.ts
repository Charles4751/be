import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DishDocument = HydratedDocument<Dish>;

@Schema({ excludeIndexes: false })
export class Dish {
  @Prop()
  merchantId: string;

  @Prop()
  dishName: string;

  @Prop()
  category: number;

  @Prop()
  price: number;

  @Prop()
  preferential: number;

  @Prop()
  inventory: number;

  @Prop()
  status: string;
}

export const DishSchema = SchemaFactory.createForClass(Dish);
