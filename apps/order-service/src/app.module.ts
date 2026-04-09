import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@libs/common';
import { PrismaModule } from '@libs/database';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/order-item.service';
import { OrderController } from './controllers/order.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CommonModule,
    PrismaModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService],
  exports: [OrderService, OrderItemService],
})
export class AppModule {}
