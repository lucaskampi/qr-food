export class TableDto {
  id: string;
  number: number;
  restaurantId: string;
}

export class CreateTableDto {
  number: number;
  restaurantId: string;
}
