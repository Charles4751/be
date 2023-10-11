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
    const dish = new this.dishModel({
      status: 'OFF_SHELF',
      ...param,
    });

    const newDish = await dish.save();
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
