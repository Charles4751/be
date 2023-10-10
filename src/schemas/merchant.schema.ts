import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MerchantDocument = HydratedDocument<Merchant>;

@Schema({ excludeIndexes: false })
export class Merchant {
  @Prop()
  userId: string;

  @Prop()
  merchantName: string;

  @Prop()
  merchantAddress: string;

  @Prop()
  merchantPhoneNumber: number;

  @Prop()
  category: number;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
