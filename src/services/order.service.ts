import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import {
  ListDto,
  ModifyDto,
} from '../data-transfer-object/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async getList(param: ListDto) {
    const { userId, offset, limit } = param;

    const total = await this.orderModel.countDocuments({ userId }).exec();

    const list = await this.orderModel
      .find({ userId })
      .skip(offset - 1)
      .limit(limit)
      .exec();

    return { list: list || [], total: total || 0 };
  }

  async modify(modifyDto: ModifyDto) {
    const updatedOrder = await this.orderModel.findOneAndUpdate(
      { _id: modifyDto.orderId },
      { status: modifyDto.status },
      { new: true },
    );

    if (!updatedOrder) {
      throw new Error('订单不存在');
    }
  }
}
