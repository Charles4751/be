import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ autoIndex: true })
export class User {
  @Prop()
  username: string;

  @Prop()
  nickName: string;

  @Prop()
  userId: number;

  @Prop({ unique: true })
  phoneNumber: number;

  @Prop()
  email: string;

  @Prop({ required: false })
  password: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
