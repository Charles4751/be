import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { ListDto } from '../data-transfer-object/order.dto';

@Controller('/api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('getList')
  async getList(@Body() param: ListDto) {
    console.log("%c Line:30 🥟 param", "color:#ea7e5c", param);
    const res = await this.orderService.getList(param);
    return res;
  }

  @Post('modify')
  async modify(@Body() param) {
    console.log("%c Line:37 🥤 param", "color:#2eafb0", param);
    this.orderService.modify(param);
    return {};
  }
}
