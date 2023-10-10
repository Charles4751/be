import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './controllers/auth.controller';
import { MerchantController } from './controllers/merchant.controller';
import { DishController } from './controllers/dish.controller';
import { OrderController } from './controllers/order.controller';

import { AuthService } from './services/auth.service';
import { MerchantService } from './services/merchant.service';
import { DishService } from './services/dish.service';
import { OrderService } from './services/order.service';

import { User, UserSchema } from './schemas/user.schema';
import { Merchant, MerchantSchema } from './schemas/merchant.schema';
import { Dish, DishSchema } from './schemas/dish.schema';
// import { Counter, CounterSchema } from './schemas/counter.schema';
import { Order, OrderSchema } from './schemas/order.schema';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Merchant.name, schema: MerchantSchema },
      { name: Dish.name, schema: DishSchema },
      // { name: Counter.name, schema: CounterSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [AuthController, MerchantController, DishController, OrderController],
  providers: [AuthService, MerchantService, DishService, OrderService],
})
export class AppModule {}
