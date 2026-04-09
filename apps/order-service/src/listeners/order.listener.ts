import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderStatusChangedEvent } from '@libs/contracts';

@Injectable()
export class OrderListener {
  private readonly logger = new Logger(OrderListener.name);

  @OnEvent('order.status.changed')
  handleOrderStatusChanged(event: OrderStatusChangedEvent) {
    this.logger.log(
      `Order ${event.orderId} status changed to ${event.status}`,
    );
  }
}
