import { IsString, IsOptional, IsMobilePhone, IsNumber } from 'class-validator';

export class ListDto {
  userId?: number;
  limit: number;
  offset: number;
}

export class ModifyDto {
  orderId: number;
  status: number;
}
