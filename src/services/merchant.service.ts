import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Merchant, MerchantDocument } from '../schemas/merchant.schema';
import {
  CreateShopDto,
  ShopListDto,
  UpdateMerchantDto,
} from '../data-transfer-object/merchant.dto';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel(Merchant.name)
    private readonly merchantModel: Model<MerchantDocument>,
  ) {}

  async getList(param: ShopListDto) {
    const { userId, offset, limit } = param;

    const total = await this.merchantModel.countDocuments({ userId }).exec();

    const list = await this.merchantModel
      .find({ userId })
      .skip(offset - 1)
      .limit(limit)
      .exec();

    return { list, total };
  }

  async create(param: CreateShopDto) {
    console.log("%c Line:33 🍢 param", "color:#6ec1c2", param);
    const merchant = new this.merchantModel(param);
    console.log("%c Line:35 🍒 merchant", "color:#e41a6a", merchant);
    const newMerchant = await merchant.save();
    return newMerchant;
  }

  async edit(updateMerchantDto: UpdateMerchantDto) {
    const updatedMerchant = await this.merchantModel.findOneAndUpdate(
      { _id: updateMerchantDto.merchantId },
      updateMerchantDto,
      { new: true },
    );

    if (!updatedMerchant) {
      // 处理商户不存在的情况
      throw new Error('商户不存在');
    }

    return updatedMerchant;
  }

  async getMerchantDetailByMerchantId({ merchantId }) {
    const merchant = await this.merchantModel
      .findOne({ _id: merchantId })
      .exec();
    return merchant;
  }

  async delete({ merchantId }) {
    const res = await this.merchantModel.deleteOne({ _id: merchantId }).exec();
    return res;
  }
}
