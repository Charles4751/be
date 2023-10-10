import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ excludeIndexes: false })
export class Order {
  @Prop()
  userId: string;

  @Prop()
  username: string;

  @Prop()
  merchantId: number;

  @Prop()
  dishId: number;

  @Prop()
  belongMerchant: string;

  @Prop()
  belongDish: string;

  @Prop()
  status: string;

  @Prop()
  address: string;

  @Prop()
  phone: number;

  @Prop()
  category: number;

  @Prop()
  price: number;

  @Prop()
  realityPrice: number;

  @Prop()
  merchantPreferential: number;

  @Prop()
  platformPreferential: number;

  @Prop()
  incomePrice: number;

  @Prop()
  orderTime: string;

  @Prop()
  paymentTime: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
