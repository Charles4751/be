import { Controller, Post, Body } from '@nestjs/common';
import { DishService } from '../services/dish.service';
import { ListDto, AddDto, ModifyDto, ModifyStatusDto } from '../data-transfer-object/dish.dto';

@Controller('/api/dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post('getList')
  async getList(@Body() param: ListDto) {
    console.log("%c Line:11 🍉 param", "color:#3f7cff", param);
    const res = await this.dishService.getList(param);
    return res;
  }

  @Post('add')
  async add(@Body() param: AddDto) {
    console.log("%c Line:18 🍿 param", "color:#7f2b82", param);
    const merchants = await this.dishService.add(param);
    return merchants;
  }

  @Post('modify')
  async modify(@Body() param: ModifyDto) {
    console.log("%c Line:24 🍇 param", "color:#ea7e5c", param);
    const merchants = await this.dishService.modify(param);
    return merchants;
  }

  @Post('modifyStatus')
  async modifyStatus(@Body() param: ModifyStatusDto) {
    console.log("%c Line:24 🍇 param", "color:#ea7e5c", param);
    const merchants = await this.dishService.modifyStatus(param);
    return merchants;
  }

  @Post('getDetailByDishId')
  async getDetailByDishId(@Body() param) {
    const dish = await this.dishService.getDetailByDishId(param);
    return dish;
  }
}
