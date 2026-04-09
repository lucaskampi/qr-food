import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '@libs/contracts';
import { KitchenService } from '../services/kitchen.service';

@Injectable()
export class OrderListener {
  private readonly logger = new Logger(OrderListener.name);

  constructor(private readonly kitchenService: KitchenService) {}

  @OnEvent('order.created')
  handleOrderCreated(event: OrderCreatedEvent) {
    this.logger.log(`Received order.created event: ${event.orderId}`);

    this.logger.log(
      `New order for table ${event.tableId}: ${event.items.length} items, total $${event.totalAmount}`,
    );
  }
}
