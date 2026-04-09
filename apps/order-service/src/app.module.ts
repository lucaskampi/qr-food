import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { CommonModule } from '@libs/common';
import { PrismaModule } from '@libs/database';
import { EventsModule } from '@libs/events';
import { HttpModule } from '@nestjs/axios';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/order-item.service';
import { OrderController } from './controllers/order.controller';
import { QrController } from './controllers/qr.controller';
import { HealthController } from './controllers/health.controller';
import { OrderListener } from './listeners/order.listener';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TerminusModule,
    CommonModule,
    PrismaModule,
    EventsModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [OrderController, QrController, HealthController],
  providers: [OrderService, OrderItemService, OrderListener],
  exports: [OrderService, OrderItemService],
})
export class AppModule {}
