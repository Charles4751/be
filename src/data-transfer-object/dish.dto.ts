class PageDto {
  limit: number;
  offset: number;
}

export class ListDto extends PageDto {
  merchantId: string;
}

export class AddDto {
  merchantId: string;
  dishName: string;
  category: number;
  price: number;
  preferential: number;
  inventory: number;
}

export class ModifyDto {
  dishId: number;
  dishName: string;
  category: number;
  price: number;
  preferential: number;
  inventory: number;
}

export class ModifyStatusDto {
  dishId: number;
  status: string;
}
