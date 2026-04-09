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
  status: string;
  updatedAt: Date;
}
