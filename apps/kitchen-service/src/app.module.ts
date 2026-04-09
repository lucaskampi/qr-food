import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@libs/common';
import { PrismaModule } from '@libs/database';
import { EventsModule } from '@libs/events';
import { KitchenService } from './services/kitchen.service';
import { KitchenController } from './controllers/kitchen.controller';
import { OrderListener } from './listeners/order.listener';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CommonModule,
    PrismaModule,
    EventsModule,
  ],
  controllers: [KitchenController],
  providers: [KitchenService, OrderListener],
  exports: [KitchenService],
})
export class AppModule {}
