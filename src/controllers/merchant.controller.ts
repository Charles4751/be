import { Controller, Post, Body, Param } from '@nestjs/common';
import { MerchantService } from '../services/merchant.service';
import {
  CreateShopDto,
  ShopListDto,
  UpdateMerchantDto,
} from '../data-transfer-object/merchant.dto';

@Controller('/api/merchants')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post('create')
  async create(@Body() param: CreateShopDto) {
    const merchants = await this.merchantService.create(param);
    return merchants;
  }

  @Post('edit')
  async edit(@Body() param: UpdateMerchantDto) {
    console.log("%c Line:21 🥔 param", "color:#465975", param);
    const merchants = await this.merchantService.edit(param);
    return merchants;
  }

  @Post('delete')
  async delete(@Body() param) {
    console.log("%c Line:27 🥝 param", "color:#ea7e5c", param);
    const res = await this.merchantService.delete(param);
    return res;
  }

  @Post('getList')
  async getList(@Body() param: ShopListDto) {
    const res = await this.merchantService.getList(param);
    return res;
  }

  @Post('getMerchantDetailByMerchantId')
  async getMerchantDetailByMerchantId(@Body() params) {
    console.log("%c Line:40 🍌 params", "color:#6ec1c2", params);
    const merchant =
      await this.merchantService.getMerchantDetailByMerchantId(params);
    return merchant;
  }
}
