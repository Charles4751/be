import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dish, DishDocument } from '../schemas/dish.schema';
// import { Counter, CounterDocument } from '../schemas/counter.schema';
import { ListDto, AddDto, ModifyDto, ModifyStatusDto } from '../data-transfer-object/dish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(Dish.name) private readonly dishModel: Model<DishDocument>,
    // @InjectModel(Counter.name)
    // private readonly counterModel: Model<CounterDocument>,
  ) {}

  private readonly logger = new Logger(DishService.name);

  async getList(param: ListDto) {
    const { merchantId, offset, limit } = param;

    const total = await this.dishModel.countDocuments({ merchantId }).exec();

    const list = await this.dishModel
      .find({ merchantId })
      .skip(offset - 1)
      .limit(limit)
      .exec();

    return { list, total };
  }

  async add(param: AddDto) {
    // const modelName = 'Dish';
    // const counter = await this.counterModel.findOneAndUpdate(
    //   { modelName },
    //   { $inc: { nextId: 1 } },
    //   { upsert: true, new: true },
    // );

    // const lastDish = await this.dishModel.findOne().sort({ dishId: -1 }).exec();
    // console.log("%c Line:42 🥑 lastDish", "color:#f5ce50", lastDish);
    // const lastDishId = lastDish ? lastDish.id : 0;

    const dish = new this.dishModel({
      status: 'OFF_SHELF',
      // ...param,
      dishName: param.dishName,
      category: param.category,
      price: param.price,
      merchantId: 1,
      preferential: param.preferential,
      inventory: param.inventory,
    });

    console.log("%c Line:47 🌶 dish", "color:#b03734", dish);
    const newDish = await dish.save();
    console.log("%c Line:51 🌭 newDish", "color:#465975", newDish);
    return newDish;
  }

  async modify(param: ModifyDto) {
    const { dishId, ...restParam } = param;
    await this.dishModel.updateOne({ _id: dishId }, restParam);
    return {
      result: 'ok',
    };
  }

  async modifyStatus(param: ModifyStatusDto) {
    const { dishId, status } = param;
    await this.dishModel.updateOne({ _id: dishId }, { status });
    return {
      result: 'ok',
    };
  }

  async getDetailByDishId({ dishId }) {
    const dish = await this.dishModel.findOne({ _id: dishId }).exec();
    return dish || {};
  }
}
