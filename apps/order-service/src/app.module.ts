import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@libs/common';
import { PrismaModule } from '@libs/database';
import { HttpModule } from '@nestjs/axios';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/order-item.service';
import { OrderController } from './controllers/order.controller';
import { QrController } from './controllers/qr.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CommonModule,
    PrismaModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [OrderController, QrController],
  providers: [OrderService, OrderItemService],
  exports: [OrderService, OrderItemService],
})
export class AppModule {}
