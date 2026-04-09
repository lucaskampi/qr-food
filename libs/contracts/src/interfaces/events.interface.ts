import { OrderStatus } from './order.dto';

export interface OrderCreatedEvent {
  orderId: string;
  restaurantId: string;
  tableId: string;
  items: Array<{
    menuItemId: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
  totalAmount: number;
  createdAt: Date;
}

export interface OrderStatusEvent {
  orderId: string;
  status: OrderStatus;
  updatedAt: Date;
}

export interface OrderStartedEvent extends OrderStatusEvent {
  status: OrderStatus.IN_PREPARATION;
}

export interface OrderReadyEvent extends OrderStatusEvent {
  status: OrderStatus.READY;
}

export interface OrderCompletedEvent extends OrderStatusEvent {
  status: OrderStatus.COMPLETED;
}

export interface OrderCancelledEvent extends OrderStatusEvent {
  status: OrderStatus.CANCELLED;
}
