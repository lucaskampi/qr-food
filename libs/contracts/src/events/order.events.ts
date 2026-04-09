import { OrderStatus } from '../dto/order.dto';

export class OrderCreatedEvent {
  constructor(
    public readonly orderId: string,
    public readonly restaurantId: string,
    public readonly tableId: string,
    public readonly items: Array<{
      menuItemId: string;
      name: string;
      quantity: number;
      unitPrice: number;
    }>,
    public readonly totalAmount: number,
    public readonly createdAt: Date,
  ) {}
}

export class OrderStatusChangedEvent {
  constructor(
    public readonly orderId: string,
    public readonly status: OrderStatus,
    public readonly updatedAt: Date,
  ) {}
}
